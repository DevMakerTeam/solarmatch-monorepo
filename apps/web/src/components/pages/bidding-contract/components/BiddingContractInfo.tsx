import { BidResponse } from "@repo/types";

interface BiddingContractInfoProps {
  data?: BidResponse;
}

const BiddingContractInfo = ({ data }: BiddingContractInfoProps) => {
  if (!data) return null;

  const {
    memo,
    bidPrice,
    solarModule,
    solarModuleOrigin,
    inverter,
    inverterOrigin,
    structure,
    asInfo,
    companyIntroduction,
  } = data;

  return (
    <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-0 w-full lg:justify-between mb-[30px] lg:mb-[90px]">
      <div className="flex flex-col gap-[20px] lg:gap-[30px] max-w-[250px] lg:max-w-[350px]">
        <p>{companyIntroduction}</p>

        <div className="flex justify-center items-center p-[8px_19px] lg:p-[9px_40px] bg-light-gray rounded-[8px] w-fit bold-body lg:bold-heading6">
          {`견적 : ${bidPrice.toLocaleString("ko-KR", { currency: "KRW" })}만원`}
        </div>
      </div>

      <div className="flex flex-col gap-[15px]">
        <ContractInfoItem
          title="태양광 모듈"
          description={solarModule}
          structureOrigin={solarModuleOrigin}
        />
        <ContractInfoItem
          title="인버터"
          description={inverter}
          structureOrigin={inverterOrigin}
        />
        <ContractInfoItem title="구조물" description={structure} />
        <ContractInfoItem title="A/S" description={asInfo} />
        <ContractInfoItem title="메시지" description={memo} />
      </div>
    </div>
  );
};

export default BiddingContractInfo;

interface ContractInfoItemProps {
  title: string;
  description: string;
  structureOrigin?: string;
}

const ContractInfoItem = ({
  title,
  description,
  structureOrigin,
}: ContractInfoItemProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-[5px] lg:gap-[44px] lg:items-center">
      <div className="w-fit lg:w-[92px] flex items-center gap-[15px] flex-shrink-0">
        <div className="w-[3px] h-[16px] bg-primary" />
        <span className="bold-body text-nowrap">{title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-[5px] lg:items-center lg:gap-[15px]">
        <p className="regular-body break-words flex-1 min-w-0 lg:max-w-[348px]">
          {description}
        </p>

        {structureOrigin && (
          <div className="flex justify-center items-center border-1 border-[#cccccc] p-[2px_10px] lg:p-[2.5px 17px] rounded-[20px] w-fit regular-small lg:regular-caption">
            {structureOrigin}
          </div>
        )}
      </div>
    </div>
  );
};
