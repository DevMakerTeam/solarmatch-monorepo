// 시공 자재
const CasesDetailMaterials = () => {
  return (
    <div className="w-full flex flex-col gap-[17px]">
      <span className="bold-body">시공 자재</span>

      <div className="p-[11px_20px] w-full flex flex-col gap-[11px] rounded-[8px] border-1 border-border-color">
        <CasesDetailMaterialsItem
          name="모듈"
          description="현대에너지 무등급 650 W양면패널"
        />
        <CasesDetailMaterialsItem
          name="인버터"
          description="금비전자 3.5W 모델명[AFKOWKOF]"
        />
        <CasesDetailMaterialsItem name="구조물" description="포스맥각관" />
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
