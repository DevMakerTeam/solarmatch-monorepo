import { useLoginMutation } from "@/api/auth/AuthApi.mutation";
import { useLoginForm } from "./useLoginForm";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { AUTH_API_QUERY_KEY } from "@/api/auth/AuthApi.query";
import { useAuth } from "@/contexts/AuthContext";

export const useLogin = () => {
  const formMethods = useLoginForm();
  const router = useRouter();
  const { returnUrl } = router.query;
  const queryClient = useQueryClient();
  const { setAuthState } = useAuth();

  // 로그인
  const { mutate: loginMutation, isPending: isLoginPending } = useLoginMutation(
    {
      options: {
        onSuccess: ({ data }) => {
          const { name } = data;

          setAuthState({
            isLoggedIn: true,
            user: null,
            userName: name,
          });

          queryClient.invalidateQueries({
            queryKey: AUTH_API_QUERY_KEY.ME(),
          });

          const replaceUrl = returnUrl ? (returnUrl as string) : "/";
          router.replace(replaceUrl);
        },
      },
    }
  );
  const handleLoginSubmit = formMethods.handleSubmit(({ email, password }) => {
    loginMutation({ email, password });
  });

  // 카카오 로그인
  const handleKakaoLogin = () => {
    const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    // 개발환경에서도 프로덕션 URL 사용 (환경변수가 없으면 기본값 사용)
    const kakaoRedirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    if (!kakaoClientId || !kakaoRedirectUri) {
      console.error("Kakao configuration is not set.");
      return;
    }

    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${encodeURIComponent(
      kakaoRedirectUri
    )}&response_type=code`;

    window.location.href = kakaoAuthUrl;
  };

  return {
    formMethods,
    handleLoginSubmit,
    isLoginPending,
    handleKakaoLogin,
  };
};
