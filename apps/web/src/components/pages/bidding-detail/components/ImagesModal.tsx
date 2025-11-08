import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { Modal, ModalProps } from "@repo/ui/modal";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const ImagesModal = ({ onClose }: Pick<ModalProps, "onClose">) => {
  const images = [
    "/images/orders-detail/image-1.jpg",
    "/images/orders-detail/image-1.jpg",
    "/images/orders-detail/image-1.jpg",
    "/images/orders-detail/image-1.jpg",
    "/images/orders-detail/image-1.jpg",
    "/images/orders-detail/image-1.jpg",
    "/images/orders-detail/image-1.jpg",
    "/images/orders-detail/image-1.jpg",
    "/images/orders-detail/image-1.jpg",
    "/images/orders-detail/image-1.jpg",
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
      x: direction > 0 ? 300 : direction < 0 ? -300 : 0,
      opacity: direction !== 0 ? 0 : 1,
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
    <Modal
      onClose={onClose}
      isCloseButtonVisible={false}
      modalContainerClassName="lg:min-w-[639px] bg-transparent"
      modalContentClassName="pt-0 px-0 pb-0 md:pt-0"
    >
      <div className="flex items-center gap-[34px]">
        <Button
          variant="ghost"
          icon={
            <Icon
              iconName="chevronLeft"
              className="w-[15px] lg:w-[20px] h-[26px] lg:h-[35px] text-white"
            />
          }
          onClick={handlePrev}
        />

        <div className="flex flex-col w-full">
          <div className="flex w-full justify-end mb-[24px]">
            <Button
              variant="ghost"
              icon={
                <Icon
                  iconName="x"
                  className="w-[20px] lg:w-[26px] h-[20px] lg:h-[26px] text-white"
                />
              }
              onClick={onClose}
            />
          </div>

          <div className="w-full aspect-[269/179] lg:aspect-[531/353] relative mb-[26px]">
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
                  alt="첨부파일"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <span className="medium-heading6 text-white text-center">
            {currentIndex + 1}/{images.length}
          </span>
        </div>

        <Button
          variant="ghost"
          icon={
            <Icon
              iconName="chevronRight"
              className="w-[15px] lg:w-[20px] h-[26px] lg:h-[35px] text-white"
            />
          }
          onClick={handleNext}
        />
      </div>
    </Modal>
  );
};

export default ImagesModal;
