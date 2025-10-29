// 시공사례 페이지

import RootLayout from "@/components/Layout/root/RootLayout";
import { Pagination } from "@repo/ui/pagination";
import Link from "next/link";
import CasesItem from "./components/CasesItem";

const CasesPage = () => {
  return (
    <RootLayout>
      <div className="w-full flex flex-col lg:flex-row gap-[40px] lg:gap-[120px] layout-padding-y">
        <h1 className="bold-heading4 lg:bold-heading3 text-center lg:text-left whitespace-nowrap">
          시공사례
        </h1>

        <div className="flex flex-col gap-[40px] lg:gap-[100px] w-full">
          <div className="flex flex-col gap-[15px] lg:grid lg:grid-cols-3 lg:gap-[30px] w-full">
            {Array.from({ length: 6 }).map((_, index) => (
              <Link href={`/cases/${index}`} key={index}>
                <CasesItem key={index} />
              </Link>
            ))}
          </div>

          <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
        </div>
      </div>
    </RootLayout>
  );
};

export default CasesPage;
