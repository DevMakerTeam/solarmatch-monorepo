import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { Input } from "@repo/ui/input";
import { Checkbox } from "@repo/ui/checkbox";
import { useLogin } from "./hooks/useLogin";
import { FormHelper } from "@repo/ui/form-helper";
import { Controller } from "react-hook-form";

// 로그인 페이지
const LoginPage = () => {
  const { control, handleSubmit, isValid, isLoginPending } = useLogin();

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-[rgba(0,4,64,1)] to-[rgba(0,7,108,1)]">
      <div className="h-[74px] lg:h-[108px] flex items-center justify-between pl-[26px] lg:pl-[44px]">
        <Icon iconName="webLogo" className="w-[174px] h-[20px] text-white" />
        <h1 className="sr-only">솔라매치 관리자 로그인</h1>
      </div>

      <main className="flex flex-1 w-full justify-center items-center">
        <div className="w-[78%] lg:w-full max-w-[438px] rounded-[20px] bg-white px-[27px] lg:px-[56px] py-[35px] lg:py-[50px]">
          <h2 className="bold-heading6 lg:bold-heading5 text-center text-primary mb-[54px]">
            솔라매치 관리자 로그인
          </h2>

          <form onSubmit={handleSubmit}>
            <Controller
              control={control}
              name="email"
              render={({ field, formState: { errors } }) => (
                <FormHelper
                  message={{ error: errors.email?.message }}
                  className="mb-[10px]"
                >
                  <Input
                    className="input-size-md lg:input-size-lg"
                    placeholder="아이디를 입력해주세요"
                    {...field}
                  />
                </FormHelper>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field, formState: { errors } }) => (
                <FormHelper
                  message={{ error: errors.password?.message }}
                  className="mb-[54px]"
                >
                  <Input
                    className="input-size-md lg:input-size-lg"
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                    {...field}
                  />
                </FormHelper>
              )}
            />

            <Button
              className="button-size-lg lg:button-size-xl w-full mb-[30px]"
              type="submit"
              disabled={!isValid}
              isLoading={isLoginPending}
            >
              로그인
            </Button>

            <Controller
              control={control}
              name="isSave"
              render={({ field }) => {
                const { value, ...fieldValues } = field;

                return (
                  <label
                    htmlFor="isSave"
                    className="flex items-center gap-[12px] medium-body cursor-pointer w-fit"
                  >
                    <Checkbox id="isSave" checked={value} {...fieldValues} />
                    아이디 저장
                  </label>
                );
              }}
            />
          </form>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
