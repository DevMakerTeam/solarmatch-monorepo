// 설치 후기

import { GetContractCaseDetailModel } from "@/api/contract/types/model/get-contract-case-detail";
import { NonData } from "@repo/ui";

interface CasesDetailReviewProps {
  data?: GetContractCaseDetailModel["data"];
}
const CasesDetailReview = ({ data }: CasesDetailReviewProps) => {
  if (!data) return null;

  const { installationReview } = data;

  return (
    <div className="w-full flex flex-col gap-[17px] h-full">
      <span className="bold-body">설치 후기</span>

      <div className="p-[11px_20px] w-full rounded-[8px] border-1 border-border-color h-full whitespace-pre-line">
        {!!installationReview ? (
          installationReview
        ) : (
          <NonData
            nonDataText="설치 후기가 없습니다."
            className="h-[92px]"
            iconClassName="w-10 h-10"
          />
        )}
      </div>
    </div>
  );
};

export default CasesDetailReview;
