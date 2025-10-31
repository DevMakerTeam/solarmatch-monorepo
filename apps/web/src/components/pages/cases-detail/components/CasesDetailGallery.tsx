import { Icon } from "@repo/ui/icon";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

// 설치 사진
const CasesDetailGallery = () => {
  const images = [
    "/images/main/main-portfolio-1.png",
    "/images/main/main-portfolio-1.png",
    "/images/main/main-portfolio-1.png",
    "/images/main/main-portfolio-1.png",
    "/images/main/main-portfolio-1.png",
    "/images/main/main-portfolio-1.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full flex flex-col gap-[17px]">
      <span className="bold-body">설치 사진</span>

      {/* 모바일 슬라이드 */}
      <div className="flex items-center justify-center gap-[23px] lg:hidden">
        {/* 이전 버튼 */}
        <button
          onClick={handlePrev}
          className="flex items-center justify-center flex-shrink-0"
          aria-label="이전 이미지"
        >
          <Icon
            iconName="chevronLeft"
            className="w-[16px] h-[30px] text-deep-gray"
          />
        </button>

        <div className="max-w-[200px] w-full aspect-[199/127] relative rounded-[8px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentIndex]}
                alt={`설치 사진 ${currentIndex + 1}`}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          className="flex items-center justify-center flex-shrink-0"
          aria-label="다음 이미지"
        >
          <Icon
            iconName="chevronRight"
            className="w-[24px] h-[24px] text-deep-gray"
          />
        </button>
      </div>

      {/* 데스크톱 그리드 */}
      <div className="hidden lg:grid grid-cols-3 gap-[20px]">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-[282/148] relative rounded-[8px] overflow-hidden"
          >
            <Image
              src={image}
              alt={`설치 사진 ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CasesDetailGallery;
