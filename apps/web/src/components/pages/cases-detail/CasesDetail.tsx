// 시공사례 상세 페이지
import RootLayout from "@/components/Layout/root";
import { Button } from "@repo/ui/button";
import Link from "next/link";
import CasesDetailOverview from "./components/CasesDetailOverview";
import CasesDetailMaterials from "./components/CasesDetailMaterials";
import CasesDetailReview from "./components/CasesDetailReview";
import CasesDetailGallery from "./components/CasesDetailGallery";

const CasesDetailPage = () => {
  return (
    <RootLayout>
      <div className="w-full flex flex-col lg:flex-row gap-[40px] lg:gap-[120px] layout-padding-y">
        <span className="bold-heading4 lg:bold-heading3 text-center lg:text-left whitespace-nowrap">
          시공사례
        </span>

        <div className="flex flex-col w-full gap-[65px] lg:gap-[120px]">
          <div className="w-full flex flex-col gap-[37px] lg:gap-[85px]">
            {/* 프로젝트 개요/요약 */}
            <CasesDetailOverview />

            <div className="w-full flex flex-col lg:flex-row gap-[37px] lg:gap-[26px]">
              {/* 시공 자재 */}
              <CasesDetailMaterials />

              {/* 설치 후기 */}
              <CasesDetailReview />
            </div>

            {/* 설치 사진 */}
            <CasesDetailGallery />
          </div>

          <Link href="/cases">
            <Button className="button-size-lg lg:button-size-xl">
              목록으로
            </Button>
          </Link>
        </div>
      </div>
    </RootLayout>
  );
};

export default CasesDetailPage;
