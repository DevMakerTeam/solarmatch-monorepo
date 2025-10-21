// 회원탈퇴 페이지
import Layout from "@/components/Layout";
import { useModals } from "@repo/hooks";
import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";
import { ConfirmModal } from "@repo/ui/modal";

const WithdrawPage = () => {
  const { open: openWithdrawModal, close: closeWithdrawModal } = useModals();

  const handleWithdrawConfirm = () => {
    openWithdrawModal(ConfirmModal, {
      onConfirm: () => {
        console.log("탈퇴하기");
        closeWithdrawModal();
      },
      onClose: closeWithdrawModal,
      text: "정말 탈퇴하시겠습니까?",
    });
  };

  return (
    <Layout footer={null}>
      <div className="layout-padding-y max-w-[408px] w-full mx-auto">
        <p className="whitespace-pre-line text-center lg:text-left bold-heading4 lg:bold-heading3 mb-[45px]">
          {"잠깐만요!\n탈퇴 전 꼭 확인해 주세요."}
        </p>

        <ul className="list-disc list-outside space-y-[30px] medium-heading6 ml-[20px]">
          <li>계약 기간 중도 해지 시 위약금이 발생할 수 있어요.</li>
          <li>탈퇴한 이메일은 아이디로 재사용할 수 없어요.</li>
          <li>
            탈퇴 시 계정에 저장된 모든 정보는 즉시 삭제되나, 정보를 보존할
            필요가 있는 경우 관계 법령에 의거해 일정 기간동안 보관 후 삭제해요.
          </li>
          <li>
            탈퇴 시 삭제된 모든 정보는 복구되지 않으며, 추후 재가입 시 처음부터
            다시 입력해야 해요
          </li>
        </ul>

        <hr className="w-full h-[1px] my-[45px] border-border-color" />

        <div className="flex items-center gap-[16px] mb-[45px]">
          <Checkbox id="agree" />
          <label htmlFor="agree" className="medium-heading6 cursor-pointer">
            <span>위 내용을 이해하였으며 동의합니다.</span>
          </label>
        </div>

        <Button className="button-size-xl" onClick={handleWithdrawConfirm}>
          탈퇴하기
        </Button>
      </div>
    </Layout>
  );
};

export default WithdrawPage;
