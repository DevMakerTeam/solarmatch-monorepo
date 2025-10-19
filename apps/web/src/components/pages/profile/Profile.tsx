// 회원정보 페이지

import Layout from "@/components/Layout";
import { useTestLoginStore } from "@/stores/testLoginStore";
import { useModals } from "@repo/hooks";
import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import Link from "next/link";
import ChangePasswordModal from "./components/ChangePasswordModal";
import ChangePhoneNumModal from "./components/ChangePhoneNumModal";
import PartnerInfo from "./components/PartnerInfo";

const ProfilePage = () => {
  const { userType } = useTestLoginStore();
  const { open: openChangePhoneNumModal, close: closeChangePhoneNumModal } =
    useModals();
  const { open: openChangePasswordModal, close: closeChangePasswordModal } =
    useModals();

  const handleChangePhoneNum = () => {
    openChangePhoneNumModal(ChangePhoneNumModal, {
      onClose: closeChangePhoneNumModal,
    });
  };
  const handleChangePassword = () => {
    openChangePasswordModal(ChangePasswordModal, {
      onClose: closeChangePasswordModal,
    });
  };

  return (
    <Layout footer={null}>
      <div className="flex flex-col lg:flex-row lg:justify-between pt-[85px] lg:pt=[172px] pb-[100px]">
        <span className="bold-heading4 lg:bold-heading3 mb-[65px] lg:mb-0">
          회원정보
        </span>

        <div className="flex flex-col w-full lg:max-w-[65%]">
          <div className="flex items-center gap-[20px] w-full mb-[30px] lg:mb-[60px]">
            <span className="bold-heading6 lg:bold-heading4 text-middle-gray whitespace-nowrap">
              기본정보
            </span>

            <hr className="w-full border-border-color h-[1px]" />
          </div>

          <div className="grid grid-cols-[auto_1fr] gap-x-[32px] gap-y-[30px] mb-[50px] lg:mb-[35px]">
            {/* 이름 */}
            <span className="bold-body lg:bold-heading5">이름</span>
            <span className="medium-body lg:medium-heading5">홍길동</span>

            {/* 이메일 */}
            <span className="bold-body lg:bold-heading5">이메일</span>
            <span className="medium-body lg:medium-heading5">
              email@mail.com
            </span>

            {/* 휴대전화 번호 */}
            <span className="bold-body lg:bold-heading5">휴대전화 번호</span>
            <div className="flex items-center gap-[10px]">
              <span className="medium-body lg:medium-heading5">
                010-1234-5678
              </span>
              <Button variant="ghost" onClick={handleChangePhoneNum}>
                <Icon
                  iconName="pencil"
                  className="w-[24px] h-[24px] cursor-pointer text-middle-gray"
                />
              </Button>
            </div>

            {/* 비밀번호 */}
            <span className="bold-body lg:bold-heading5">비밀번호</span>
            <Button
              variant="outline"
              className="button-size-sm lg:button-size-md w-[120px] lg:w-[130px]"
              onClick={handleChangePassword}
            >
              변경하기
            </Button>
          </div>

          <div className="flex justify-end w-full">
            <Link href="/withdraw">
              <Button variant="ghost" className="w-fit medium-small">
                회원탈퇴
              </Button>
            </Link>
          </div>

          {userType === "partner" && <PartnerInfo />}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
