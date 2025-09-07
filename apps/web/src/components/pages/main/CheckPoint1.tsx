import CheckPoint from '@/components/pages/main/CheckPoint';
import MotionSection from '@/components/pages/main/MotionSection';

export default function CheckPoint1() {
  return (
    <MotionSection>
      <CheckPoint
        index={1}
        image={
          <div className='aspect-square w-full max-w-[300px]'>
            <img src='/images/main-2.png' alt='main-2' />
          </div>
        }
        contents={
          <div className='flex flex-col gap-[9px]'>
            <div className='flex flex-col heavy-heading3 text-primary'>
              <p className=''>시공자재를 숨김없이</p>
              <span>
                <span className='text-secondary'>투명 공개</span>
                <span>해요</span>
              </span>
            </div>

            <div className='flex flex-col bold-heading6 text-black'>
              <p>솔라매치는 시공사가 어떤 자재를 쓰는지</p>
              <p>고객에게 100% 공개해요</p>
            </div>
          </div>
        }
      />
    </MotionSection>
  );
}
