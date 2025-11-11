// 계정 찾기 페이지
import RootLayout from "@/components/Layout/root";
import AccountNotFoundView from "./components/AccountNotFoundView";
import FindAccountFormView from "./components/FindAccountFormView";
import FoundAccountView from "./components/FoundAccountView";
import { useFindAccount } from "./hooks/useFindAccount";
import { FormProvider } from "react-hook-form";

const FindAccountPage = () => {
  const {
    formMethods,
    findAccountSuccess,
    findAccountIdle,
    handleSubmit,
    sendVerificationSuccess,
    handleSendVerification,
    handleVerifyCode,
    verifyCodeSuccess,
    findAccountFormValidation,
    foundAccounts,
  } = useFindAccount();

  return (
    <RootLayout>
      <div className="flex flex-col layout-padding-y text-center max-w-[408px] w-full mx-auto">
        <h1 className="bold-heading4 lg:bold-heading3 mb-[13px] lg:mb-[26px]">
          계정 찾기
        </h1>

        <FormProvider {...formMethods}>
          {findAccountIdle ? (
            <FindAccountFormView
              onSubmit={handleSubmit}
              sendVerificationSuccess={sendVerificationSuccess}
              handleSendVerification={handleSendVerification}
              handleVerifyCode={handleVerifyCode}
              verifyCodeSuccess={verifyCodeSuccess}
              findAccountFormValidation={findAccountFormValidation}
            />
          ) : findAccountSuccess ? (
            <FoundAccountView foundAccounts={foundAccounts} />
          ) : (
            <AccountNotFoundView />
          )}
        </FormProvider>
      </div>
    </RootLayout>
  );
};

export default FindAccountPage;
