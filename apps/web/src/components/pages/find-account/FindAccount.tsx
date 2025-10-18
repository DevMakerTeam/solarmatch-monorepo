// 계정 찾기 페이지

import Layout from "@/components/Layout";
import { useMemo, useState } from "react";
import AccountNotFoundView from "./components/AccountNotFoundView";
import FindAccountFormView from "./components/FindAccountFormView";
import FoundAccountView from "./components/FoundAccountView";

const FindAccountPage = () => {
  const [isSuccess, setIsSuccess] = useState<boolean | undefined>(undefined);

  const View = useMemo(() => {
    switch (isSuccess) {
      case true:
        // 계정 찾기 성공
        return <FoundAccountView />;
      case false:
        // 계정 찾기 실패
        return <AccountNotFoundView />;
      default:
        // 계정 찾기 폼
        return (
          <FindAccountFormView
            onClickFindAccountButton={() => {
              const found = confirm(
                `퍼블리싱 용도입니다.\n계정을 찾았습니까?\n(확인=찾음, 취소=못찾음)`
              );
              setIsSuccess(found);
            }}
          />
        );
    }
  }, [isSuccess]);

  return (
    <Layout footer={null}>
      <div className="flex flex-col pt-[85px] lg:pt-[148px] text-center max-w-[408px] w-full mx-auto">
        <h1 className="bold-heading4 lg:bold-heading3 mb-[13px] lg:mb-[26px]">
          계정 찾기
        </h1>

        {View}
      </div>
    </Layout>
  );
};

export default FindAccountPage;
