const OrdersContractInfo = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-0 w-full lg:justify-between mb-[30px] lg:mb-[90px]">
      <div className="flex flex-col gap-[20px] lg:gap-[30px] max-w-[250px] lg:max-w-[350px]">
        <p>
          안녕하세요~ 경북 구미에서 활동하는 솔라에너지입니다. 저희는 5년의
          경력이 있고, 열심히 활동합니다. 신뢰있는 시공 건수와 다양한 경력으로
          승부합니다.
        </p>

        <div className="flex justify-center items-center p-[8px_19px] lg:p-[9px_40px] bg-light-gray rounded-[8px] w-fit bold-body lg:bold-heading6">
          견적 : 350만원
        </div>
      </div>

      <div className="flex flex-col gap-[15px]">
        <ContractInfoItem
          title="태양광 모듈"
          description="현대에너지 무등급 650 W양면패널"
          structureOrigin="국내산"
        />
        <ContractInfoItem
          title="인버터"
          description="금비전자 3.5W 모델명[AFKOWKOF]"
          structureOrigin="중국산"
        />
        <ContractInfoItem title="구조물" description="포스맥각관" />
        <ContractInfoItem
          title="A/S"
          description="모듈 20년 제조사보증, 인버터 5년 업체 하자보수 : 3년"
        />
        <ContractInfoItem
          title="구조물"
          description="안녕하세요~ 경북 구미에서 활동하는 솔라에너지입니다. 저희는 5년의 경력이 있고, 열심히 활동합니다. 잘 부탁드립니다."
        />
      </div>
    </div>
  );
};

export default OrdersContractInfo;

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
