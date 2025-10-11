import MotionSection from "@/components/pages/main/MotionSection";
import { Icon } from "@repo/ui/icon";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
        <ScrollGuide />

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
          src="/images/main/main-1.png"
          alt="main-1"
          className="aspect-[7/6] w-full object-cover mt-[30px]"
        />
      </div>
    </MotionSection>
  );
}

function ScrollGuide() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return (
    <motion.div
      className="flex flex-col items-center gap-[5px] absolute bottom-[20%] left-[50%] -translate-x-1/2"
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: hasScrolled ? 0 : 1,
        y: hasScrolled ? 20 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      style={{ pointerEvents: hasScrolled ? "none" : "auto" }}
    >
      <p className="regular-caption">Scroll</p>

      <div className="w-[20px] h-[40px] rounded-[20px] border-1 border-black relative overflow-hidden">
        <motion.div
          className="w-[7px] h-[7px] rounded-full bg-black absolute left-[50%] -translate-x-1/2"
          animate={
            !hasScrolled
              ? {
                  bottom: ["10%", "10%", "70%", "10%", "10%"],
                }
              : {
                  bottom: "10%",
                }
          }
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: hasScrolled ? 0 : Infinity,
            times: [0, 0.2, 0.5, 0.8, 1],
          }}
        />
      </div>
    </motion.div>
  );
}
