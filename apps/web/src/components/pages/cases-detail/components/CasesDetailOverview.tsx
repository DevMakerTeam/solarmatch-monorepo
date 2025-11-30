// CasesDetailOverview
import { GetContractCaseDetailModel } from "@/api/contract/types/model/get-contract-case-detail";
import { DEFAULT_LOGO_URL } from "@repo/constants";
import { Icon } from "@repo/ui/icon";
import Image from "next/image";

interface CasesDetailOverviewProps {
  data?: GetContractCaseDetailModel["data"];
}

const CasesDetailOverview = ({ data }: CasesDetailOverviewProps) => {
  if (!data) return null;

  const { constructionPhotos, quoteInfo, bidInfo } = data;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-[35px] lg:gap-[80px]">
      <div className="aspect-[350/167] w-full lg:max-w-[311px] max-h-[188px] lg:aspect-none relative rounded-[8px] overflow-hidden">
        <Image
          src={
            !!constructionPhotos.length
              ? constructionPhotos[0].imageUrl
              : DEFAULT_LOGO_URL
          }
          alt="cases"
          fill
          className="object-cover"
        />
      </div>

      <div className="w-full flex flex-col gap-[14px]">
        <div className="p-[6px_15px] rounded-[30px] border-1 border-border-color w-fit text-deep-gray medium-caption">
          {quoteInfo.installationType}
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

            <span>
              {quoteInfo.baseAddress} {quoteInfo.detailAddress}
            </span>
          </div>

          <div className="flex gap-[20px] items-center">
            <div className="flex gap-[12px] items-center w-[100px]">
              <Icon
                iconName="bolt"
                className="w-[24px] h-[24px] text-middle-gray"
              />

              <span className="bold-body">용량</span>
            </div>

            <span>{`${quoteInfo.plannedCapacity}kw`}</span>
          </div>

          <div className="flex gap-[20px] items-center">
            <div className="flex gap-[12px] items-center w-[100px]">
              <Icon
                iconName="company"
                className="w-[24px] h-[24px] text-middle-gray"
              />

              <span className="bold-body">설치 회사</span>
            </div>

            <span>{bidInfo.companyName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasesDetailOverview;
