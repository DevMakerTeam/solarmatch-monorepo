import { Icon } from "@repo/ui/icon";
import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";

const PartnerInfo = () => {
  return (
    <>
      <div className="flex items-center gap-[20px] w-full mb-[30px] lg:mb-[60px] mt-[30px] lg:mt-[60px]">
        <span className="bold-heading6 lg:bold-heading4 text-middle-gray whitespace-nowrap">
          업체정보
        </span>

        <hr className="w-full border-border-color h-[1px]" />
      </div>

      <div className="flex flex-col gap-[28px] lg:gap-[20px] mb-[25px] lg:mb-[45px]">
        {/* 업체명 */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-[8px] lg:gap-[70px]">
          <span className="bold-body lg:bold-heading5 whitespace-nowrap max-w-[110px] w-full">
            업체명
          </span>
          <Input
            className="input-size-sm lg:input-size-md"
            placeholder="업체명을 입력해 주세요."
            readOnly
          />
        </div>

        {/* 업체 소개글 */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-[8px] lg:gap-[70px]">
          <span className="bold-body lg:bold-heading5 whitespace-nowrap max-w-[110px] w-full">
            업체 소개글
          </span>

          <Textarea
            className="w-full h-[165px]"
            placeholder="업체 소개를 입력해 주세요."
            readOnly
          />
        </div>
      </div>

      {/* 시공 사례 */}
      <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[70px]">
        <span className="bold-body lg:bold-heading5 whitespace-nowrap max-w-[110px] w-full">
          시공 사례
        </span>

        <div className="flex flex-col gap-[22px] w-full">
          {/* Item1 */}
          <PartnerInfoItem />
          <PartnerInfoItem />
          <PartnerInfoItem />
        </div>
      </div>
    </>
  );
};

export default PartnerInfo;

const PartnerInfoItem = () => {
  return (
    <div className="flex gap-[20px] w-full pb-[20px] border-b border-border-color">
      {/* TODO: Image로 교체 */}
      <div className="w-[135px] self-stretch bg-light-gray"></div>

      <div className="flex flex-col">
        <span className="bold-caption lg:bold-body mb-[16px]">
          경상북도 성주군 주택용 3kw
        </span>

        <div className="flex items-center mb-[5px]">
          <Icon
            iconName="circleLocation"
            className="w-[15.6px] h-[15.6px] text-middle-gray"
          />
          <span className="medium-caption ml-[6px]">{`위치 ${"경상북도 성주군"}`}</span>
        </div>

        <div className="flex items-center">
          <Icon
            iconName="bolt"
            className="w-[15.6px] h-[15.6px] text-middle-gray"
          />
          <span className="medium-caption ml-[6px]">{`용량 ${"99.76kw"}`}</span>
        </div>
      </div>
    </div>
  );
};
