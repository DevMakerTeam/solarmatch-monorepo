import { useLoginForm } from "./useLoginForm";
import { useLoginMutation } from "@/api/auth/AuthApi.mutation";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

export const useLogin = () => {
  const formMethods = useLoginForm();
  const router = useRouter();
  const { setAuthState } = useAuth();

  const {
    control,
    formState: { isValid },
  } = formMethods;

  const { mutate: loginMutation } = useLoginMutation({
    options: {
      onSuccess: () => {
        setAuthState({
          isLoggedIn: true,
        });

        router.replace("/");
      },
    },
  });

  const handleSubmit = formMethods.handleSubmit(
    ({ email, password, isSave }) => {
      // 아이디 저장: 로그인 성공/실패와 관계없이 체크된 상태에서 로그인 버튼을 누르면 저장
      if (isSave) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      loginMutation({ email, password });
    }
  );

  return { control, handleSubmit, isValid };
};
