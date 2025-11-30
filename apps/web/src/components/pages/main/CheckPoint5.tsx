import CheckPoint from "./CheckPoint";
import MotionSection from "./MotionSection";

const CheckPoint5 = () => {
  return (
    <MotionSection>
      <CheckPoint
        index={5}
        image={<></>}
        contents={
          <div className="flex flex-col gap-[20px] md:gap-[25px]">
            <div className="flex flex-col heavy-heading4 md:heavy-heading3 text-primary">
              <span>공사비 예치 후,</span>
              <span>단순 변심이라도</span>
              <span>
                <span className="text-secondary">100% 환불</span>
                <span>돼요</span>
              </span>
            </div>

            <div className="flex flex-col bold-body">
              <p>시공이 시작되기 전이라면,</p>
              <p>고객님의 변심까지도 안전하게 보장해요</p>
              <p>👉 솔라매치만의 특별한 안심 환불 정책이에요</p>
            </div>
          </div>
        }
      />
    </MotionSection>
  );
};

export default CheckPoint5;
