import { Icon } from "@repo/ui/icon";
import { Pagination } from "@repo/ui/pagination";
import Image from "next/image";

const Cases = () => {
  return (
    <div className="flex flex-col gap-[25px] lg:gap-[30px]">
      <div className="flex items-center gap-[15px]">
        <div className="w-[px] border-[2px] border-primary h-[24px] lg:h-[32px]" />

        <h2 className="bold-body lg:bold-heading6 text-primary">시공 사례</h2>
      </div>

      <div className="flex flex-col gap-[24px] lg:gap-[34px] w-full max-w-full lg:max-w-[403px] lg:min-w-[403px]">
        <div className="w-full flex flex-col gap-[15px]">
          {[1, 2, 3, 4, 5].map(i => (
            <div className="w-full flex gap-[10px] lg:gap-[20px]" key={i}>
              {/* 이미지 영역 - 고정 비율 */}
              <div className="relative w-[135px] aspect-[16/9] flex-shrink-0">
                <Image
                  src="/images/image-1.jpg"
                  alt="시공 사례"
                  fill
                  className="object-cover"
                />
              </div>

              {/* 텍스트 영역 */}
              <div className="flex-1 flex flex-col justify-center">
                <span className="bold-caption lg:bold-body">
                  경상북도 성주군 주택용 3kw
                </span>

                <div className="flex items-center mt-[13px]">
                  <Icon
                    iconName="circleLocation"
                    className="w-[15.6px] h-[15.6px] text-middle-gray"
                  />
                  <span className="medium-caption ml-[6px]">
                    <span className="bold-caption">위치&nbsp;&nbsp;</span>
                    <span>경상북도 성주군</span>
                  </span>
                </div>

                <div className="flex items-center mt-[7px]">
                  <Icon
                    iconName="bolt"
                    className="w-[15.6px] h-[15.6px] text-middle-gray"
                  />
                  <span className="medium-caption ml-[6px]">
                    <span className="bold-caption">용량&nbsp;&nbsp;</span>
                    <span>99.76kw</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />
      </div>
    </div>
  );
};

export default Cases;
