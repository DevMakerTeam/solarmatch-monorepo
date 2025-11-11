import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiResponse } from "@repo/types";
import type { LoginModel } from "@/api/auth/types/model/login-model";
import { setAuthCookies } from "./utils/cookies";

type LoginSuccessResponse = LoginModel & { success: true };
type LoginErrorResponse = ApiResponse<null | Record<string, unknown>> & {
  success: false;
};
type LoginApiResponse = LoginSuccessResponse | LoginErrorResponse;

const isProduction = process.env.NODE_ENV === "production";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const handlePost = async (
  req: NextApiRequest,
  res: NextApiResponse<LoginApiResponse>
) => {
  if (!API_BASE_URL) {
    return res.status(500).json({
      success: false,
      message: "API base URL is not configured.",
      data: null,
    });
  }

  const { email, password } = req.body ?? {};

  try {
    const backendResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseBody = (await backendResponse.json()) as LoginApiResponse;

    if (!backendResponse.ok || !responseBody.success) {
      return res.status(backendResponse.status).json(responseBody);
    }

    setAuthCookies(res, responseBody.data, {
      secure: isProduction,
    });

    return res.status(200).json(responseBody);
  } catch (error) {
    console.error("Failed to login:", error);

    return res.status(500).json({
      success: false,
      message: "로그인 처리 중 오류가 발생했습니다.",
      data: null,
    });
  }
};

const loginHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<LoginApiResponse>
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

export default loginHandler;
