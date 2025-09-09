import MotionSection from '@/components/pages/main/MotionSection';
import { Icon } from '@repo/ui';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SLIDE_INTERVAL_MS = 3000; // 슬라이드 전환 간격 (밀리초)
const INITIAL_DELAY_MS = 1000; // 애니메이션 완료 후 첫 슬라이드 시작 지연 시간 (밀리초)

const dummyData = [
  {
    id: 1,
    name: '서울시 강남구 주택용 5kW',
    location: '서울시 강남구',
    capacity: 124.5,
    thumbnail: '/images/main-portfolio-1.png',
  },
  {
    id: 2,
    name: '부산시 해운대구 상업용 10kW',
    location: '부산시 해운대구',
    capacity: 248.9,
    thumbnail: '/images/main-portfolio-1.png',
  },
  {
    id: 3,
    name: '대구시 수성구 주택용 7kW',
    location: '대구시 수성구',
    capacity: 173.25,
    thumbnail: '/images/main-portfolio-1.png',
  },
  {
    id: 4,
    name: '인천시 연수구 아파트 단지 15kW',
    location: '인천시 연수구',
    capacity: 372.8,
    thumbnail: '/images/main-portfolio-1.png',
  },
  {
    id: 5,
    name: '경기도 성남시 주택용 6kW',
    location: '경기도 성남시',
    capacity: 148.75,
    thumbnail: '/images/main-portfolio-1.png',
  },
  {
    id: 6,
    name: '전라남도 여수시 공장용 20kW',
    location: '전라남도 여수시',
    capacity: 496.2,
    thumbnail: '/images/main-portfolio-1.png',
  },
];

export default function Portfolio() {
  return (
    <div className='px-[30px] xl:px-0 w-full'>
      <MotionSection className='max-w-[526px] w-full bg-light-gray rounded-[20px] pt-[69px] mx-auto mt-[73px] md:mt-[102px]'>
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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let startTimeout: NodeJS.Timeout;

    const startInterval = () => {
      interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex: number) => (prevIndex + 1) % dummyData.length
        );
      }, SLIDE_INTERVAL_MS); // 슬라이드 전환 간격
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval);
        clearTimeout(startTimeout);
      } else {
        clearInterval(interval);
        clearTimeout(startTimeout);
        if (isAnimationComplete) {
          startTimeout = setTimeout(() => {
            startInterval();
          }, INITIAL_DELAY_MS);
        }
      }
    };

    // isAnimationComplete가 true가 되면 지정된 시간 후에 시작
    if (isAnimationComplete) {
      startTimeout = setTimeout(() => {
        startInterval();
      }, INITIAL_DELAY_MS);
    }

    // 탭 활성화/비활성화 감지
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      clearTimeout(startTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAnimationComplete]);

  const currentItem = dummyData[currentIndex];

  return (
    <div className='max-w-[235px] w-full mx-auto rounded-tl-[20px] rounded-tr-[20px] border-t-8 border-l-8 border-r-8 border-deep-gray pt-[24px] pl-[13px] pr-[19px] bg-white pb-[26px]'>
      <p className='bold-body'>시공사례</p>

      <div className='overflow-hidden mt-[20px]'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentItem.id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className='flex flex-col gap-[20px] w-full'
          >
            <div className='relative w-full aspect-[2/1] rounded-[7px] overflow-hidden'>
              <Image
                src={currentItem.thumbnail}
                alt={currentItem.name}
                fill
                className='object-cover'
              />
            </div>
            <p className='bold-body truncate'>{currentItem.name}</p>

            <div className='flex flex-col gap-[13px]'>
              <div className='flex gap-[4px] items-center medium-caption'>
                <Icon iconName='circleLocation' className='text-[15.6px]' />

                <span className='bold-caption'>위치</span>
                <span>{currentItem.location}</span>
              </div>
              <div className='flex gap-[4px] items-center medium-caption'>
                <Icon iconName='power' className='text-[15.6px]' />

                <span className='bold-caption'>용량</span>
                <span>{`${currentItem.capacity}kw`}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
