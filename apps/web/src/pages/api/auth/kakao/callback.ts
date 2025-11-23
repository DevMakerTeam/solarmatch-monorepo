import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiResponse } from "@repo/types";
import type { LoginModel } from "@/api/auth/types/model/login-model";
import { setAuthCookies } from "../utils/cookies";
import { AuthApi } from "@/api/auth/AuthApi";
import axios from "axios";

type KakaoCallbackSuccessResponse = LoginModel & { success: true };
type KakaoCallbackErrorResponse = ApiResponse<null | Record<
  string,
  unknown
>> & {
  success: false;
};
type KakaoCallbackApiResponse =
  | KakaoCallbackSuccessResponse
  | KakaoCallbackErrorResponse;

const isProduction = process.env.NODE_ENV === "production";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const handleGet = async (
  req: NextApiRequest,
  res: NextApiResponse<KakaoCallbackApiResponse>
) => {
  if (!API_BASE_URL) {
    return res.status(500).json({
      success: false,
      message: "API base URL is not configured.",
      data: null,
    });
  }

  const { code, error } = req.query;

  if (error) {
    return res.redirect(
      `/login?error=${encodeURIComponent("카카오 로그인이 취소되었습니다.")}`
    );
  }

  if (!code || typeof code !== "string") {
    return res.redirect(
      `/login?error=${encodeURIComponent("인증 코드가 없습니다.")}`
    );
  }

  try {
    // 서버사이드용 axios 인스턴스 생성 (백엔드 API에 직접 요청)
    const serverAxiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // AuthApi에 서버사이드 인스턴스 주입
    const authApi = new AuthApi(serverAxiosInstance);

    // 백엔드 API에 카카오 인증 코드 전달하여 로그인/회원가입 처리
    const response = await authApi.kakaoAuth({ code });

    if (!response.success) {
      return res.redirect(
        `/login?error=${encodeURIComponent(
          response.message || "로그인에 실패했습니다."
        )}`
      );
    }

    // response.data가 LoginModel의 data 구조와 동일하다고 가정
    // (accessToken, refreshToken 등 포함)
    const loginData = response.data as LoginModel["data"];

    console.log("loginData", loginData);

    // 쿠키 설정 및 리다이렉트
    setAuthCookies(
      res,
      {
        accessToken: loginData.accessToken,
        refreshToken: loginData.refreshToken,
      },
      {
        secure: isProduction,
      }
    );

    return res.redirect("/");
  } catch (error) {
    console.error("Failed to handle kakao callback:", error);

    let errorMessage = "카카오 로그인 처리 중 오류가 발생했습니다.";
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as
        | ApiResponse<unknown>
        | { message?: string };
      if ("message" in errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    }

    return res.redirect(`/login?error=${encodeURIComponent(errorMessage)}`);
  }
};

const kakaoCallbackHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<KakaoCallbackApiResponse>
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

export default kakaoCallbackHandler;
