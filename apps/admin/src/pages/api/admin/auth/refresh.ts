import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiResponse } from "@repo/types";
import type { RefreshModel } from "@/api/auth/types/model/refresh-model";
import { setAuthCookies } from "./utils/cookies";

type RefreshSuccessResponse = RefreshModel & { success: true };
type RefreshErrorResponse = ApiResponse<null | Record<string, unknown>> & {
  success: false;
};
type RefreshApiResponse = RefreshSuccessResponse | RefreshErrorResponse;

const isProduction = process.env.NODE_ENV === "production";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const handlePost = async (
  req: NextApiRequest,
  res: NextApiResponse<RefreshApiResponse>
) => {
  if (!API_BASE_URL) {
    return res.status(500).json({
      success: false,
      message: "API base URL is not configured.",
      data: null,
    });
  }

  const refreshToken =
    (req.body as { refreshToken?: string } | undefined)?.refreshToken ??
    req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "리프레시 토큰이 없습니다.",
      data: null,
    });
  }

  try {
    const backendResponse = await fetch(
      `${API_BASE_URL}/api/admin/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    const responseBody = (await backendResponse.json()) as RefreshApiResponse;

    if (!backendResponse.ok || !responseBody.success) {
      return res.status(backendResponse.status).json(responseBody);
    }

    setAuthCookies(res, responseBody.data, {
      secure: isProduction,
    });

    return res.status(200).json(responseBody);
  } catch (error) {
    console.error("Failed to refresh token:", error);

    return res.status(500).json({
      success: false,
      message: "토큰 갱신 중 오류가 발생했습니다.",
      data: null,
    });
  }
};

const refreshHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<RefreshApiResponse>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      message: "허용되지 않은 요청입니다.",
      data: null,
    });
  }

  return handlePost(req, res);
};

export default refreshHandler;
