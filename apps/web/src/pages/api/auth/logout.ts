import type { NextApiRequest, NextApiResponse } from "next";
import type { LogoutModel } from "@/api/auth/types/model/logout-model";
import { clearAuthCookies } from "./utils/cookies";

const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const handlePost = async (
  req: NextApiRequest,
  res: NextApiResponse<LogoutModel>
) => {
  if (!BACKEND_API_BASE_URL) {
    clearAuthCookies(res);
    return res.status(500).json({
      success: false,
      message: "API base URL is not configured.",
      data: {},
    });
  }

  try {
    const backendResponse = await fetch(
      `${BACKEND_API_BASE_URL}/api/auth/logout`,
      {
        method: "POST",
        headers: {
          Cookie: req.headers.cookie ?? "",
        },
      }
    );

    const responseBody = (await backendResponse.json()) as LogoutModel;

    clearAuthCookies(res);

    return res.status(backendResponse.status).json(responseBody);
  } catch (error) {
    console.error("Failed to logout:", error);

    clearAuthCookies(res);

    return res.status(500).json({
      success: false,
      message: "로그아웃 처리 중 오류가 발생했습니다.",
      data: {},
    });
  }
};

const logoutHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<LogoutModel>
) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      message: "허용되지 않은 요청입니다.",
      data: {},
    });
  }

  return handlePost(req, res);
};

export default logoutHandler;
