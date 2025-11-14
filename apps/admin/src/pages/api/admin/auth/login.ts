import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiResponse } from "@repo/types";
import type { LoginModel } from "@/api/auth/types/model/login-model";
import { serializeCookie } from "./utils/cookies";
import { decodeJwt } from "@/utils/authToken";

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

  const { email, password, isSave } = req.body ?? {};

  try {
    const backendResponse = await fetch(
      `${API_BASE_URL}/api/admin/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const responseBody = (await backendResponse.json()) as LoginApiResponse;

    if (!backendResponse.ok || !responseBody.success) {
      return res.status(backendResponse.status).json(responseBody);
    }

    const authCookies: string[] = [];

    // accessToken은 항상 영구 쿠키로 저장 (JWT 만료시간 기준)
    if (responseBody.data.accessToken) {
      const accessToken = responseBody.data.accessToken;
      let maxAge = 60 * 15; // 기본값: 15분

      const decoded = decodeJwt(accessToken);
      if (decoded?.exp) {
        const current = Math.floor(Date.now() / 1000);
        const tokenExpiresIn = decoded.exp - current;
        if (tokenExpiresIn > 0) {
          maxAge = tokenExpiresIn;
        }
      }

      authCookies.push(
        serializeCookie("accessToken", accessToken, {
          httpOnly: true,
          secure: isProduction,
          sameSite: "lax",
          path: "/",
          maxAge,
        })
      );
    }

    // refreshToken은 isSave가 true일 때만 저장 (아이디 저장 미체크 시 저장하지 않음)
    if (isSave && responseBody.data.refreshToken) {
      const refreshToken = responseBody.data.refreshToken;
      // 아이디 저장 체크: 영구 쿠키 (refreshToken 만료시간 기준)
      let maxAge = 60 * 60 * 24 * 7; // 기본값: 7일

      const decoded = decodeJwt(refreshToken);
      if (decoded?.exp) {
        const current = Math.floor(Date.now() / 1000);
        const tokenExpiresIn = decoded.exp - current;
        if (tokenExpiresIn > 0) {
          maxAge = tokenExpiresIn;
        }
      }

      authCookies.push(
        serializeCookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: isProduction,
          sameSite: "lax",
          path: "/",
          maxAge,
        })
      );
    } else if (!isSave) {
      // 아이디 저장 미체크: refreshToken 쿠키 삭제 (이전에 저장된 경우 대비)
      authCookies.push(
        serializeCookie("refreshToken", "", {
          httpOnly: true,
          secure: isProduction,
          sameSite: "lax",
          path: "/",
          maxAge: 0,
        })
      );
    }

    if (isSave && email) {
      // refreshToken의 만료시간을 기준으로 savedEmail 쿠키 만료시간 설정
      const refreshToken = responseBody.data.refreshToken;
      let maxAge = 60 * 60 * 24 * 7; // 기본값: 7일

      if (refreshToken) {
        const decoded = decodeJwt(refreshToken);
        if (decoded?.exp) {
          const current = Math.floor(Date.now() / 1000);
          const tokenExpiresIn = decoded.exp - current;
          if (tokenExpiresIn > 0) {
            maxAge = tokenExpiresIn;
          }
        }
      }

      authCookies.push(
        serializeCookie("savedEmail", email, {
          httpOnly: false,
          secure: isProduction,
          sameSite: "lax",
          path: "/",
          maxAge,
        })
      );
    } else {
      authCookies.push(
        serializeCookie("savedEmail", "", {
          httpOnly: false,
          secure: isProduction,
          sameSite: "lax",
          path: "/",
          maxAge: 0,
        })
      );
    }

    if (authCookies.length > 0) {
      res.setHeader("Set-Cookie", authCookies);
    }

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
