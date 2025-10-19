// 비밀번호 변경하기 페이지

import Layout from "@/components/Layout";
import { useModals } from "@repo/hooks";
import { Button } from "@repo/ui/button";
import { FormField } from "@repo/ui/form-field";
import { Input } from "@repo/ui/input";
import EmailLinkModal from "./components/EmailLinkModal";

const ChangePasswordPage = () => {
  const { open, close } = useModals();

  const handleOpenEmailLinkModal = () => {
    open(EmailLinkModal, {
      onClose: close,
    });
  };

  return (
    <Layout footer={null}>
      <form>
        <div className="pt-[85px] lg:pt-[148px] max-w-[408px] w-full mx-auto">
          <h1 className="bold-heading4 lg:bold-heading3 text-center mb-[26px] lg:mb-[13px]">
            비밀번호 변경하기
          </h1>

          <p className="medium-heading6 text-center whitespace-pre-line lg:whitespace-normal mb-[45px] lg:mb-[110px]">
            {
              "회원가입 시 입력했던\n 계정 정보를 입력하시면\n 비밀번호를 재설정할 수 있는\n 링크를 보내드립니다."
            }
          </p>

          <FormField
            label="이메일"
            required
            className="mb-[45px] lg:mb-[100px]"
          >
            <Input
              placeholder="이메일을 입력해 주세요."
              className="input-size-md"
            />
          </FormField>

          <Button className="button-size-xl" onClick={handleOpenEmailLinkModal}>
            이메일로 재설정 링크 전송하기
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default ChangePasswordPage;
