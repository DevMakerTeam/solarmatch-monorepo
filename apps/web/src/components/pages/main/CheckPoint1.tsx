import CheckPoint from "@/components/pages/main/CheckPoint";
import MotionSection from "@/components/pages/main/MotionSection";

export default function CheckPoint1() {
  return (
    <MotionSection>
      <CheckPoint
        index={1}
        image={
          <div className="aspect-square w-full max-w-[207px] md:max-w-[300px] mt-[18px] md:mt-0">
            <img src="/images/main/main-2.png" alt="main-2" />
          </div>
        }
        contents={
          <div className="flex flex-col gap-[9px]">
            <div className="flex flex-col heavy-heading4 md:heavy-heading3 text-primary">
              <p className="">시공자재, 숨김없이</p>
              <span>
                <span className="text-secondary">투명 공개</span>
                <span>해요</span>
              </span>
            </div>

            <div className="flex flex-col bold-body md:bold-heading6 text-black">
              <p>솔라매치는 모듈·인버터·구조물 등</p>
              <p>모든 사용 자재 정보를 입찰부터 100% 공개해요</p>
            </div>
          </div>
        }
      />
    </MotionSection>
  );
}
