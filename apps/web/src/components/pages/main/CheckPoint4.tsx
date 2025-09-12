import CheckPoint from "@/components/pages/main/CheckPoint";
import MotionSection from "@/components/pages/main/MotionSection";
import { motion } from "framer-motion";

export default function CheckPoint4() {
  return (
    <MotionSection>
      {isAnimationComplete => (
        <CheckPoint
          index={4}
          contents={
            <>
              <div className="heavy-heading4 md:heavy-heading3 text-primary">
                <span>
                  <span className="text-secondary">철저한 검증</span>
                  <span>으로</span>
                </span>
                <p>파트너를 선정해요</p>
              </div>

              <div className="flex items-center mt-[14px]">
                <img
                  src="/images/main/main-8.png"
                  alt="main-8"
                  className="w-[44px] h-[44px] md:w-[68px] md:h-[68px]"
                />
                <p className="bold-heading6 text-black">건물주 선호도 1위</p>
              </div>

              <p className="heavy-heading6 md:heavy-heading5 text-secondary mt-[22px]">
                자격먼허 / 시공경험 / 시공품질
              </p>
            </>
          }
          image={
            <div className="flex flex-col items-center justify-center gap-[12px] mt-[44px] md:mt-0">
              <img
                src="/images/main/main-6.png"
                alt="main-6"
                className="w-[52px] h-[52px] md:w-[62px] md:h-[62px]"
              />

              <motion.div
                className="w-full max-w-[279px] md:max-w-[580px] bg-white aspect-[2/1]"
                animate={
                  isAnimationComplete
                    ? {
                        y: [0, -15, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img src="/images/main/main-7.png" alt="main-7" />
              </motion.div>
            </div>
          }
        />
      )}
    </MotionSection>
  );
}
