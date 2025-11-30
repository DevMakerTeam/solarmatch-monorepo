import MotionSection from "@/components/pages/main/MotionSection";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";

// 숫자 카운트업 애니메이션 훅
const useCountUp = (
  end: number,
  isTriggered: boolean,
  duration: number = 2000
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isTriggered) {
      setCount(0);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // easeOutQuart 애니메이션 곡선 적용
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easedProgress * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, isTriggered, duration]);

  return count;
};

export default function Dashboard() {
  return (
    <MotionSection className="w-full mt-[74px] md:mt-[132px] flex flex-col gap-[30px] md:gap-[60px] px-[30px] xl:px-0">
      {isAnimationComplete => (
        <>
          <div className="flex flex-col md:flex-row text-center heavy-heading4 md:heavy-heading3 text-primary">
            <p>투명한 태양광 비교견적,&nbsp;</p>
            <p>솔라매치에서</p>
          </div>

          <DashboardContents isAnimationComplete={isAnimationComplete} />
        </>
      )}
    </MotionSection>
  );
}

interface DashboardContentsProps {
  isAnimationComplete: boolean;
}

function DashboardContents({ isAnimationComplete }: DashboardContentsProps) {
  // 각 숫자에 대한 카운트업 애니메이션
  const percentage = useCountUp(48, isAnimationComplete, 2000);
  const companies = useCountUp(135, isAnimationComplete, 2500);
  const projects = useCountUp(12359, isAnimationComplete, 3000);

  return (
    <div className="flex flex-col gap-[12px]">
      <DashboardItem
        title={
          <div className="flex flex-col md:flex-row bold-heading5">
            <p>솔라매치를 통한 견적가&nbsp;</p>
            <p>시중대비 평균</p>
          </div>
        }
        animation={
          <div className="flex items-center">
            <span className="heavy-heading3">{`${percentage}%`}&nbsp;</span>
            <span className="bold-heading4">절감</span>
          </div>
        }
        image={"/images/main/main-dashboard-1.png"}
      />

      <div className="flex flex-col md:flex-row gap-[12px]">
        <DashboardItem
          title={<p className="bold-heading5">검증된 파트너</p>}
          animation={
            <div className="flex items-center">
              <span className="heavy-heading3">{`${companies}`}&nbsp;</span>
              <span className="bold-heading4">개소</span>
              <span className="bold-heading6 mt-1.5">(지속 확대 중)</span>
            </div>
          }
          image={"/images/main/main-dashboard-2.png"}
        />

        <DashboardItem
          title={<p className="bold-heading5">전체 파트너 시공 이력</p>}
          animation={
            <div className="flex items-center">
              <span className="heavy-heading3">
                {`${projects.toLocaleString()}`}&nbsp;
              </span>
              <span className="bold-heading4">건 이상</span>
            </div>
          }
          image={"/images/main/main-dashboard-3.png"}
        />
      </div>
    </div>
  );
}

interface DashboardItemProps {
  title: ReactNode;
  animation: ReactNode;
  image: string;
}

function DashboardItem({ title, animation, image }: DashboardItemProps) {
  return (
    <div className="text-white w-full h-[200px] relative rounded-xl overflow-hidden">
      {/* 배경 이미지 */}
      <Image src={image} alt={image} fill className="object-cover" />

      {/* 검정색 오버레이 */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      />

      {/* 콘텐츠 */}
      <div className="absolute top-[12px] left-[25px] z-10">{title}</div>
      <div className="absolute bottom-[22px] left-[25px] z-10">{animation}</div>
    </div>
  );
}
