// 시공 자재

import { GetContractCaseDetailModel } from "@/api/contract/types/model/get-contract-case-detail";
import { NonData } from "@repo/ui";

interface CasesDetailMaterialsProps {
  data?: GetContractCaseDetailModel["data"];
}
const CasesDetailMaterials = ({ data }: CasesDetailMaterialsProps) => {
  if (!data) return null;

  const { bidInfo } = data;
  const isBidInfoEmpty =
    !bidInfo.solarModule && !bidInfo.inverter && !bidInfo.structure;

  return (
    <div className="w-full flex flex-col gap-[17px]">
      <span className="bold-body">시공 자재</span>

      <div className="p-[11px_20px] w-full flex flex-col gap-[11px] rounded-[8px] border-1 border-border-color">
        {isBidInfoEmpty ? (
          <NonData
            nonDataText="시공 자재가 없습니다."
            className="h-[92px]"
            iconClassName="w-10 h-10"
          />
        ) : (
          <>
            {!!bidInfo.solarModule && (
              <CasesDetailMaterialsItem
                name="모듈"
                description={`${bidInfo.solarModule}(${bidInfo.solarModuleOrigin})`}
              />
            )}

            {!!bidInfo.inverter && (
              <CasesDetailMaterialsItem
                name="인버터"
                description={`${bidInfo.inverter}(${bidInfo.inverterOrigin})`}
              />
            )}

            {!!bidInfo.structure && (
              <CasesDetailMaterialsItem
                name="구조물"
                description={bidInfo.structure}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CasesDetailMaterials;

interface CasesDetailMaterialsItemProps {
  name: string;
  description: string;
}

const CasesDetailMaterialsItem = ({
  name,
  description,
}: CasesDetailMaterialsItemProps) => {
  return (
    <div className="w-full flex gap-[14px] items-center">
      <div className="w-[60px] flex items-center gap-[15px]">
        <div className="w-[3px] h-[16px] bg-primary" />

        <span className="bold-body whitespace-nowrap">{name}</span>
      </div>

      <span className="medium-caption">{description}</span>
    </div>
  );
};
