import { useGetContractCasesQuery } from "@/api/contract/ContractApi.query";
import MotionSection from "@/components/pages/main/MotionSection";
import { Icon } from "@repo/ui/icon";
import { Spinner } from "@repo/ui/spinner";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type ContractCaseItem = {
  contractId: number;
  title: string;
  baseAddress: string;
  detailAddress: string;
  plannedCapacity: number;
  representativePhotoUrl: string;
};

const SLIDE_INTERVAL_MS = 2000;

export default function Portfolio() {
  return (
    <div className="px-[30px] xl:px-0 w-full">
      <MotionSection className="max-w-[526px] w-full bg-light-gray rounded-[20px] pt-[69px] mx-auto mt-[73px] md:mt-[102px]">
        {isAnimationComplete => (
          <PortfolioContents isAnimationComplete={isAnimationComplete} />
        )}
      </MotionSection>
    </div>
  );
}

interface PortfolioContentsProps {
  isAnimationComplete: boolean;
}

function PortfolioContents({ isAnimationComplete }: PortfolioContentsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data, isLoading } = useGetContractCasesQuery({
    variables: {
      page: 1,
      pageSize: 6,
    },
    options: {
      enabled: !!isAnimationComplete,
    },
  });

  const { data: contractCasesData } = data || {};
  const { data: contractCasesList = [] } = contractCasesData || {};

  // API 데이터를 포트폴리오 형식으로 변환
  const portfolioData = contractCasesList.map((item: ContractCaseItem) => ({
    id: item.contractId,
    name: item.title,
    location: item.baseAddress,
    capacity: item.plannedCapacity,
    thumbnail: item.representativePhotoUrl || "",
  }));

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startInterval = () => {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex: number) =>
          portfolioData.length > 0 ? (prevIndex + 1) % portfolioData.length : 0
        );
      }, SLIDE_INTERVAL_MS); // 슬라이드 전환 간격
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval);
      } else {
        clearInterval(interval);
        if (isAnimationComplete) {
          startInterval();
        }
      }
    };

    // isAnimationComplete가 true가 되면 바로 시작
    if (isAnimationComplete) {
      startInterval();
    }

    // 탭 활성화/비활성화 감지
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAnimationComplete]);

  const currentItem =
    portfolioData.length > 0
      ? portfolioData[currentIndex % portfolioData.length]
      : null;

  return (
    <div className="max-w-[235px] w-full mx-auto rounded-tl-[20px] rounded-tr-[20px] border-t-8 border-l-8 border-r-8 border-deep-gray pt-[24px] pl-[13px] pr-[19px] bg-white pb-[26px]">
      <p className="bold-body">시공사례</p>

      <div className="overflow-hidden mt-[20px]">
        {!isAnimationComplete || isLoading ? (
          <div className="w-full h-[210px] flex justify-center items-center">
            <Spinner size="lg" className="text-primary" />
          </div>
        ) : portfolioData.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem?.id || "empty"}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col gap-[20px] w-full"
            >
              <div className="relative w-full aspect-[2/1] rounded-[7px] overflow-hidden">
                <Image
                  src={currentItem?.thumbnail || ""}
                  alt={currentItem?.name || ""}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="bold-body truncate">{currentItem?.name || ""}</p>

              <div className="flex flex-col gap-[13px]">
                <div className="flex gap-[10px] items-center medium-caption">
                  <Icon
                    iconName="circleLocation"
                    className="w-[15.6px] h-[15.6px] text-middle-gray"
                  />

                  <span className="bold-caption text-nowrap">위치</span>
                  <span className="truncate">
                    {currentItem?.location || ""}
                  </span>
                </div>

                <div className="flex gap-[10px] items-center medium-caption">
                  <Icon
                    iconName="bolt"
                    className="w-[15.6px] h-[15.6px] text-middle-gray"
                  />

                  <span className="bold-caption">용량</span>
                  <span className="truncate">
                    {currentItem?.capacity ? `${currentItem.capacity}kw` : ""}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="w-full h-[210px] flex justify-center items-center">
            <p className="text-middle-gray">표시할 데이터가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
