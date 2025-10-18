import { Button } from "@repo/ui/button";
import { FormField } from "@repo/ui/form-field";
import { Input } from "@repo/ui/input";

interface FindAccountFormViewProps {
  onClickFindAccountButton: () => void;
}

const FindAccountFormView = ({
  onClickFindAccountButton,
}: FindAccountFormViewProps) => {
  return (
    <form>
      <div className="flex flex-col text-center medium-heading6 mb-[45px] lg:mb-[65px]">
        <p>회원가입 시 입력했던 정보를</p>
        <p>입력해주세요.</p>
      </div>

      <FormField label="이름" required className="mb-[40px]">
        <Input placeholder="이름을 입력해 주세요." className="input-size-md" />
      </FormField>

      <FormField label="휴대전화 번호" className="mb-[45px] lg:mb-[70px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <Input
              className="input-size-md"
              placeholder="휴대전화 번호를 입력해 주세요."
              required
            />
            <Button className="max-w-[97px] lg:max-w-[120px] w-full button-size-lg">
              인증하기
            </Button>
          </div>

          <div className="flex items-center gap-[10px]">
            <Input
              className="input-size-md"
              placeholder="인증번호 6자리를 입력해 주세요."
              disabled
            />

            <Button
              className="max-w-[97px] lg:max-w-[120px] w-full button-size-lg"
              disabled
            >
              확인
            </Button>
          </div>
        </div>
      </FormField>

      <Button
        type="button"
        className="button-size-xl"
        onClick={onClickFindAccountButton}
      >
        계정 찾기
      </Button>
    </form>
  );
};

export default FindAccountFormView;
