import AdminRootLayout from "@/components/layouts/root";
import UserInfo from "./components/UserInfo";
import PartnerInfo from "./components/PartnerInfo";
import Cases from "./components/Cases";
import { Icon } from "@repo/ui/icon";
import { Button } from "@repo/ui/button";
import { useUserDetail } from "./hooks/useUserDetail";

const UserDetail = () => {
  const { userDetail, isPartner, handleDeleteUser } = useUserDetail();

  return (
    <AdminRootLayout>
      <form className="flex flex-col gap-[32px] lg:gap-[42px]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[7px] medium-body w-fit cursor-pointer">
            <Icon
              iconName="chevronLeft"
              className="w-4 h-4 text-black stroke-[1.3]"
            />

            <label className="cursor-pointer">목록으로</label>
          </div>

          {isPartner && (
            <Button
              type="submit"
              className="button-size-sm lg:button-size-md w-[76px] lg:w-[122px]"
              variant="outline"
            >
              저장
            </Button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-[50px] lg:gap-[120px] lg:justify-between overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&_*[data-select-dropdown]]:!overflow-visible lg:pb-[140px]">
          <UserInfo
            handleDeleteUser={handleDeleteUser}
            userData={{
              name: userDetail?.name,
              email: userDetail?.email,
              phone: userDetail?.phone,
              provider: userDetail?.provider,
              isActive: userDetail?.isActive,
              id: userDetail?.id,
            }}
          />

          {isPartner && <PartnerInfo partnerInfo={userDetail?.partnerInfo} />}
          {isPartner && <Cases />}
        </div>
      </form>
    </AdminRootLayout>
  );
};

export default UserDetail;
