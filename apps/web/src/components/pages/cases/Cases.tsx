// 시공사례 페이지
import RootLayout from "@/components/Layout/root/RootLayout";
import { Pagination } from "@repo/ui/pagination";
import Link from "next/link";
import CasesItem from "./components/CasesItem";
import { useCases } from "./hooks/useCases";
import { NonData } from "@repo/ui";

const CasesPage = () => {
  const {
    contractCasesList,
    currentPage,
    handlePageChange,
    isLoading,
    totalCount,
    totalPages,
  } = useCases();

  return (
    <RootLayout isLoading={isLoading}>
      <div className="w-full flex flex-col lg:flex-row gap-[40px] lg:gap-[120px] layout-padding-y">
        <h1 className="bold-heading4 lg:bold-heading3 text-center lg:text-left whitespace-nowrap">
          시공사례
        </h1>

        <div className="flex flex-col gap-[40px] lg:gap-[100px] w-full">
          {!!totalCount ? (
            <div className="flex flex-col gap-[15px] lg:grid lg:grid-cols-3 lg:gap-[30px] w-full">
              {contractCasesList.map(item => (
                <Link href={`/cases/${item.contractId}`} key={item.contractId}>
                  <CasesItem {...item} />
                </Link>
              ))}
            </div>
          ) : (
            <NonData nonDataText="시공 사례가 없습니다." />
          )}

          {!!totalCount && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </RootLayout>
  );
};

export default CasesPage;
