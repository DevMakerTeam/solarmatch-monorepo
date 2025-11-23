import RootLayout from "@/components/Layout/root";
import { SolarStructureType } from "@repo/types";
import { PropsWithChildren } from "react";
import BiddingNav from "./components/BiddingNav";

interface BiddingLayoutProps {
  sideType: SolarStructureType;
}

const BiddingLayout = ({
  children,
  sideType,
}: PropsWithChildren<BiddingLayoutProps>) => {
  return (
    <RootLayout>
      <div className="layout-padding-y flex flex-col lg:flex-row gap-[40px] lg:gap-[120px]">
        <div className="flex flex-col gap-[45px]">
          <span className="bold-heading4 lg:bold-heading3 text-center lg:text-left whitespace-nowrap">
            견적확인
          </span>

          <BiddingNav sideType={sideType} />
        </div>

        {children}
      </div>
    </RootLayout>
  );
};

export default BiddingLayout;
