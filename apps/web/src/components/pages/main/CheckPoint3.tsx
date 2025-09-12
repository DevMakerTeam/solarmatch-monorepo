import CheckPoint from "@/components/pages/main/CheckPoint";
import MotionSection from "@/components/pages/main/MotionSection";

export default function CheckPoint3() {
  return (
    <MotionSection>
      <CheckPoint
        index={3}
        image={
          <div className="aspect-square w-full max-w-[300px] bg-white">
            <img src="/images/main/main-5.gif" alt="main-5" />
          </div>
        }
        contents={
          <div className="flex flex-col gap-[15px]">
            <div className="heavy-heading4 md:heavy-heading3 text-primary">
              <span>
                <span>공사가 전부 </span>
                <span className="text-secondary">완료</span>
                <span>된</span>
              </span>
              <p>후에 시공업체가</p>
              <span>
                <span className="text-secondary">대금정산</span>
                <span>을</span>
                <span> 받아요</span>
              </span>
            </div>

            <div className="text-black bold-body md:bold-heading6">
              <p>시공업체와 AS, 환불</p>
              <p>사전 계약으로 보장받아요</p>
            </div>
          </div>
        }
      />
    </MotionSection>
  );
}
