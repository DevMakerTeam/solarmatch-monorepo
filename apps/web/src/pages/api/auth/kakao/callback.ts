import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiResponse } from "@repo/types";
import type { LoginModel } from "@/api/auth/types/model/login-model";
import { setAuthCookies } from "../utils/cookies";
import { KakaoAuthModel } from "@/api/auth/types/model/kakao-auto-model";

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
    // 백엔드 API에 카카오 인증 코드 전달하여 로그인/회원가입 처리
    const backendResponse = await fetch(`${API_BASE_URL}/api/auth/kakao/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const response = (await backendResponse.json()) as
      | ApiResponse<LoginModel["data"]>
      | ApiResponse<KakaoAuthModel["data"]>;

    if (!backendResponse.ok || !response.success) {
      return res.redirect(
        `/login?error=${encodeURIComponent(
          response.message || "로그인에 실패했습니다."
        )}`
      );
    }

    // 실제 백엔드 응답 구조 확인
    // 기존 사용자: LoginModel (accessToken, refreshToken 포함)
    // 신규 사용자: KakaoAuthModel (socialId, email, phone 등만 포함)
    const responseData = response.data as unknown;

    // 신규 사용자인 경우: socialId가 있으면 회원가입 페이지로 리다이렉트
    if (
      responseData &&
      typeof responseData === "object" &&
      "socialId" in responseData
    ) {
      const kakaoAuthData = responseData as KakaoAuthModel["data"];

      // socialId, email, phone을 쿼리 파라미터로 전달하여 회원가입 페이지로 리다이렉트
      const queryParams = new URLSearchParams({
        socialId: String(kakaoAuthData.socialId),
        ...(kakaoAuthData.email && { email: kakaoAuthData.email }),
        ...(kakaoAuthData.phone && { phone: kakaoAuthData.phone }),
      });

      return res.redirect(`/signup?${queryParams.toString()}`);
    }

    // 기존 사용자인 경우: LoginModel 구조 (토큰 포함)
    if (
      responseData &&
      typeof responseData === "object" &&
      "accessToken" in responseData &&
      "refreshToken" in responseData
    ) {
      const loginData = responseData as LoginModel["data"];
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
    }

    // 예상치 못한 응답 구조
    return res.redirect("/");
  } catch (error) {
    console.error("Failed to handle kakao callback:", error);
    return res.redirect(
      `/login?error=${encodeURIComponent("카카오 로그인 처리 중 오류가 발생했습니다.")}`
    );
  }
};

const kakaoCallbackHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<KakaoCallbackApiResponse>
) => {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      success: false,
      message: "허용되지 않은 요청입니다.",
      data: null,
    });
    return;
  }

  await handleGet(req, res);
};

export default kakaoCallbackHandler;
