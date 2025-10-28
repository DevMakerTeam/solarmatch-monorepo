// 비밀번호 초기화 페이지
// 이메일 인증 후 새 비밀번호를 설정하는 페이지 (비밀번호 찾기 플로우)

import RootLayout from "@/components/Layout/root";
import { Button } from "@repo/ui/button";
import { FormField } from "@repo/ui/form-field";
import { Icon } from "@repo/ui/icon";
import { Input } from "@repo/ui/input";

const ResetPasswordPage = () => {
  return (
    <RootLayout footer={null}>
      <form>
        <div className="layout-padding-y max-w-[408px] w-full mx-auto">
          <h1 className="bold-heading4 lg:bold-heading3 text-center mb-[26px] lg:mb-[13px]">
            비밀번호 변경하기
          </h1>

          <p className="medium-heading6 text-center mb-[45px] lg:mb-[110px]">
            새로운 비밀번호를 입력해 주세요.
          </p>

          <FormField
            label="비밀번호"
            required
            className="mb-[45px] lg:mb-[100px]"
          >
            <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-[6px]">
                <Icon
                  iconName="circleExclamation"
                  className="w-[16.4px] text-middle-gray"
                />

                <span className="medium-small">
                  8~16자 영문, 숫자, 특수문자를 조합하여 입력해 주세요.
                </span>
              </div>
              <Input
                placeholder="비밀번호를 입력해 주세요."
                className="input-size-lg"
              />

              <Input
                placeholder="입력한 비밀번호를 한번 더 입력해 주세요."
                className="input-size-lg"
              />
            </div>
          </FormField>

          <Button className="button-size-xl">비밀번호 변경하기</Button>
        </div>
      </form>
    </RootLayout>
  );
};

export default ResetPasswordPage;
