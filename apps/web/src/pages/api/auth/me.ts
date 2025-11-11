import type { NextApiRequest, NextApiResponse } from "next";
import type { MeModel } from "@/api/auth/types/model/me-model";
import type { ApiResponse } from "@repo/types";

type MeSuccessResponse = MeModel & { success: true };
type MeErrorResponse = ApiResponse<MeModel["data"] | null> & { success: false };
type MeApiResponse = MeSuccessResponse | MeErrorResponse;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const handleGet = async (
  req: NextApiRequest,
  res: NextApiResponse<MeApiResponse>
) => {
  if (!API_BASE_URL) {
    return res.status(500).json({
      success: false,
      message: "API base URL is not configured.",
      data: null,
    });
  }

  const { accessToken } = req.cookies ?? {};

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "액세스 토큰이 없습니다.",
      data: null,
    });
  }

  try {
    const cookieHeader = req.headers.cookie;
    const backendResponse = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      cache: "no-store",
    });

    const responseBody = (await backendResponse.json()) as MeApiResponse;

    return res.status(backendResponse.status).json(responseBody);
  } catch (error) {
    console.error("Failed to fetch profile:", error);

    return res.status(500).json({
      success: false,
      message: "사용자 정보를 가져오지 못했습니다.",
      data: null,
    });
  }
};

const meHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<MeApiResponse>
) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      success: false,
      message: "허용되지 않은 요청입니다.",
      data: null,
    });
  }

  return handleGet(req, res);
};

export default meHandler;
