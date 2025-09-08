import MotionSection from '@/components/pages/main/MotionSection';
import { cn } from '@repo/utils';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ContractProcess() {
  return (
    <MotionSection className='w-full mt-[88px] md:mt-[102px]'>
      {isAnimationComplete => (
        <ContractProcessContents isAnimationComplete={isAnimationComplete} />
      )}
    </MotionSection>
  );
}

interface AnimationProps {
  isAnimationComplete: boolean;
}

function ContractProcessContents({ isAnimationComplete }: AnimationProps) {
  return (
    <div className=''>
      <DotAnimation isAnimationComplete={isAnimationComplete} />
      <p className='heavy-heading4 md:heavy-heading3 text-primary'>
        계약은 이렇게 진행되요
      </p>

      <div className='flex flex-col md:flex-row bold-body md:bold-heading6 mt-[21px] md:mt-[13p]'>
        <span>계약체결까지 평균 소요기간 3일!&nbsp; </span>
        <span>간편한 전자계약으로 진행해요</span>
      </div>

      <Process isAnimationComplete={isAnimationComplete} />
    </div>
  );
}

const PROCESS_LIST = [
  '비교 견적 신청',
  '한전 연계 가능여부 검토',
  '시공회사 입찰',
  '고객이 선택 후 전자계약',
  '시공일정 협의',
];

const Process = ({ isAnimationComplete }: AnimationProps) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isAnimationComplete) return;

    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % PROCESS_LIST.length);
    }, 1500); // 각 단계마다 800ms

    return () => clearInterval(interval);
  }, [isAnimationComplete]);

  return (
    <div className='flex gap-[24px] mt-[40px] md:mt-[65px]'>
      {/* Order */}
      <div className='flex flex-col'>
        {PROCESS_LIST.map((_, index) => {
          const isLast = index === PROCESS_LIST.length - 1;
          const isActive = activeStep === index;

          return (
            <div key={`order-${index + 1}`} className='flex flex-col'>
              <motion.div
                className={cn(
                  'rounded-full w-[31px] h-[31px] md:w-[43px] md:h-[43px] flex justify-center items-center text-white transition-colors duration-300',
                  isActive ? 'bg-secondary' : 'bg-middle-gray',
                  isActive
                    ? 'heavy-heading6 md:heavy-heading5'
                    : 'bold-body md:bold-heading6'
                )}
                animate={{
                  scale: isActive ? 1.3 : 1,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut',
                }}
              >
                {index + 1}
              </motion.div>

              {!isLast && (
                <div className='w-[1px] h-[24px] md:h-[30px] border-l border-dashed border-middle-gray mx-auto' />
              )}
            </div>
          );
        })}
      </div>

      {/* Process */}
      <div className='flex flex-col gap-[24px] md:gap-[30px]'>
        {PROCESS_LIST.map((process, index) => {
          const isActive = activeStep === index;

          return (
            <div
              className='h-[31px] md:h-[43px] flex items-center'
              key={`process-${index + 1}`}
            >
              <motion.p
                className={cn(
                  'bold-heading6 md:bold-heading5',
                  isActive ? 'text-secondary' : 'text-black'
                )}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  fontWeight: isActive ? '800' : '600',
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut',
                }}
              >
                {process}
              </motion.p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DotAnimation = ({ isAnimationComplete }: AnimationProps) => {
  const dotVariants: Variants = {
    hidden: {
      scale: 0,
      y: 15,
      opacity: 0,
    },
    visible: {
      scale: [0, 1.3, 1],
      y: [15, -15, 0],
      opacity: [0, 1, 1],
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  };

  return (
    <motion.div
      className='flex gap-[25px] ml-[90px] md:ml-[120px]'
      variants={containerVariants}
      initial='hidden'
      animate={isAnimationComplete ? 'visible' : 'hidden'}
    >
      <motion.div
        className='w-[7px] h-[7px] bg-primary rounded-full'
        variants={dotVariants}
      />
      <motion.div
        className='w-[7px] h-[7px] bg-primary rounded-full'
        variants={dotVariants}
      />
      <motion.div
        className='w-[7px] h-[7px] bg-primary rounded-full'
        variants={dotVariants}
      />
    </motion.div>
  );
};
