import MotionSection from "@/components/pages/main/MotionSection";
import { Icon } from "@repo/ui";

export default function LeftTop() {
  return (
    <MotionSection className="w-full flex flex-col items-center">
      <div className="p-[13px_37px] md:p-[20px_60px] bg-light-primary flex justify-center items-center rounded-[30px]">
        <Icon iconName="webLogo" className="w-full h-[20px] text-primary" />
      </div>

      <p className="bold-heading6 md:bold-heading5 text-deep-gray mt-[33px]">
        태양광 사기는 이제 그만
      </p>

      <div className="relative w-full mt-[15px]">
        <div className="absolute top-0 left-0 w-full">
          <p className="heavy-heading4 md:heavy-heading3 text-primary text-center">
            투명한 견적
          </p>

          <div className="heavy-heading4 md:heavy-heading3 text-primary text-center">
            <span className="text-secondary">솔라매치</span>
            <span>에서 비교하세요</span>
          </div>
        </div>

        <img
          src="/images/main-1.png"
          alt="main-1"
          className="aspect-[7/6] w-full object-cover mt-[30px]"
        />
      </div>
    </MotionSection>
  );
}
