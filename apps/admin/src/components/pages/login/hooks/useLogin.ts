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
      loginMutation({ email, password, isSave });
    }
  );

  return { control, handleSubmit, isValid };
};
