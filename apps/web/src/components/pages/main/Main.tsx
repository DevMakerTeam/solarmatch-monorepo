import RootLayout from "@/components/Layout/root";

import { Button } from "@repo/ui/button";
import CheckPoint1 from "./CheckPoint1";
import CheckPoint2 from "./CheckPoint2";
import CheckPoint3 from "./CheckPoint3";
import CheckPoint4 from "./CheckPoint4";
import ContractProcess from "./ContractProcess";
import Dashboard from "./Dashboard";
import LeftTop from "./LeftTop";
import Portfolio from "./Portfolio";
import Review from "./Review";
import StickyAsideForm from "./StickyAsideForm";

import Link from "next/link";
import MotionSection from "./MotionSection";
import CheckPoint5 from "./CheckPoint5";

export default function MainPage() {
  return (
    <RootLayout isPx={false}>
      <div className="flex justify-between gap-[30px] pb-[72px] md:pb-[52px] xl:pb-[82px]">
        {/* left side */}
        <div className="w-full pt-[50px] md:pt-[80px] flex flex-col items-center">
          <LeftTop />
          <div className="flex flex-col gap-[60px] md:gap-[120px] w-full px-[30px] xl:px-0">
            <MotionSection>
              <div className="flex flex-col items-center mt-[40px] md:mt-[80px] mb-[40px] md:mb-[80px]">
                <p className="heavy-heading4 md:heavy-heading3 text-primary">
                  솔라매치는
                </p>
                <p className="mb-[15px] heavy-heading4 md:heavy-heading3 text-primary">
                  직접 시공하지 않습니다.
                </p>

                <p className="bold-heading6 md:bold-heading5 leading-10">
                  공사비에서 이윤을 남기지 않기에,
                </p>
                <p className="bold-heading6 md:bold-heading5 leading-10">
                  고객과 시공업체 사이에서
                </p>
                <p className="bold-heading6 md:bold-heading5 leading-10">
                  공정하고 투명한 비교를 보장합니다.
                </p>
              </div>
            </MotionSection>
            {/* 체크포인트 1~4 */}
            <CheckPoint1 />
            <CheckPoint2 />
            <CheckPoint3 />
            <CheckPoint4 />
            <CheckPoint5 />
          </div>

          {/* 시공사례 */}
          <Portfolio />
          {/* 계약 프로세스 */}
          <ContractProcess />
          {/* 대쉬보드 */}
          <Dashboard />
          {/* 리뷰 */}
          <Review />

          <div className="mt-[15px] py-[30px] xl:hidden px-[30px] xl:px-0 sticky bottom-0 w-full z-10">
            <Link href="/compare-quotes">
              <Button className="button-size-xl">
                실시간 비교 견적 받아보기
              </Button>
            </Link>
          </div>
        </div>

        <StickyAsideForm />
      </div>
    </RootLayout>
  );
}
