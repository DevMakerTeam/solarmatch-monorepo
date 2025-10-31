// CasesDetailOverview
import { Icon } from "@repo/ui/icon";
import Image from "next/image";

const CasesDetailOverview = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-[35px] lg:gap-[80px]">
      <div className="aspect-[350/167] w-full lg:max-w-[311px] max-h-[188px] lg:aspect-none relative rounded-[8px] overflow-hidden">
        <Image
          src="/images/main/main-portfolio-1.png"
          alt="cases"
          fill
          className="object-cover"
        />
      </div>

      <div className="w-full flex flex-col gap-[14px]">
        <div className="p-[6px_15px] rounded-[30px] border-1 border-border-color w-fit text-deep-gray medium-caption">
          지붕형(기본형)
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="flex gap-[20px] items-center">
            <div className="flex gap-[12px] items-center w-[100px]">
              <Icon
                iconName="circleLocation"
                className="w-[24px] h-[24px] text-middle-gray"
              />

              <span className="bold-body">위치</span>
            </div>

            <span>경상북도 성주군</span>
          </div>

          <div className="flex gap-[20px] items-center">
            <div className="flex gap-[12px] items-center w-[100px]">
              <Icon
                iconName="bolt"
                className="w-[24px] h-[24px] text-middle-gray"
              />

              <span className="bold-body">용량</span>
            </div>

            <span>99.76kw</span>
          </div>

          <div className="flex gap-[20px] items-center">
            <div className="flex gap-[12px] items-center w-[100px]">
              <Icon
                iconName="company"
                className="w-[24px] h-[24px] text-middle-gray"
              />

              <span className="bold-body">설치 회사</span>
            </div>

            <span>(주)선라이즈</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasesDetailOverview;
