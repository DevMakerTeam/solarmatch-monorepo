import CheckPoint from '@/components/pages/main/CheckPoint';
import MotionSection from '@/components/pages/main/MotionSection';
import { motion } from 'framer-motion';

export default function CheckPoint2() {
  return (
    <MotionSection>
      <CheckPoint
        index={2}
        image={
          <div className='aspect-square w-full max-w-[228px] md:max-w-[368px] mt-[32px] md:mt-0'>
            <img src='/images/main-3.png' alt='main-3' />
          </div>
        }
        contents={
          <div className='flex flex-col md:items-end md:gap-[65px] gap-[32px]'>
            <div className='flex flex-col gap-[9px]'>
              <div className='heavy-heading4 md:heavy-heading3 text-primary'>
                <p>시공업체별 견적을</p>
                <span>
                  <span className='text-secondary'>한눈에 </span>
                  <span>비교해요</span>
                </span>
              </div>

              <div className='bold-body md:bold-heading6 text-black'>
                <p>솔라매치에서만 가능한 투명한</p>
                <p>입찰방식의 견적시스템이에요</p>
              </div>
            </div>

            <div className='flex items-center gap-[7px] w-full'>
              <p className='heavy-heading5 md:heavy-heading4 text-black'>
                추가금 걱정은 NO!
              </p>

              <motion.div
                className='relative w-[44px] h-[44px] md:w-[56px] md:h-[56px]'
                animate={{
                  // opacity: [1, 0.5, 1],
                  // scale: [1, 1.1, 1],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <img
                  src='/images/main-4.png'
                  alt='main-4'
                  className='w-full h-full'
                />
              </motion.div>
            </div>
          </div>
        }
      />
    </MotionSection>
  );
}
