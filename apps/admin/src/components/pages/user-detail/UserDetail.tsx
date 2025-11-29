import AdminRootLayout from "@/components/layouts/root";
import UserInfo from "./components/UserInfo";
import PartnerInfo from "./components/PartnerInfo";
import Cases from "./components/Cases";
import { Icon } from "@repo/ui/icon";
import { Button } from "@repo/ui/button";
import { useUserDetail } from "./hooks/useUserDetail";
import { FormProvider } from "react-hook-form";
import AdminLoading from "@/components/AdminLoading";

const UserDetail = () => {
  const {
    userDetail,
    isPartner,
    handleDeleteUser,
    goToList,
    formMethods,
    uploadLogoImage,
    deleteLogoImage,
    url,
    handleSubmit,
    isValid,
    totalPages,
    currentPage,
    handlePageChange,
    casesList,
    isUserDetailLoading,
    isUserDetailFetching,
    casesTotal,
  } = useUserDetail();

  if (isUserDetailLoading) {
    return <AdminLoading />;
  }

  return (
    <AdminRootLayout>
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col gap-[32px] lg:gap-[42px]"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center">
            <div
              className="flex items-center gap-[7px] medium-body w-fit cursor-pointer"
              onClick={goToList}
            >
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
                disabled={!isValid}
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

            {isPartner && (
              <PartnerInfo
                partnerInfo={userDetail?.partnerInfo}
                uploadLogoImage={uploadLogoImage}
                deleteLogoImage={deleteLogoImage}
                url={url}
              />
            )}
            {isPartner && (
              <Cases
                totalPages={totalPages ?? 1}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                casesList={casesList}
                isUserDetailFetching={isUserDetailFetching}
                casesTotal={casesTotal}
              />
            )}
          </div>
        </form>
      </FormProvider>
    </AdminRootLayout>
  );
};

export default UserDetail;
