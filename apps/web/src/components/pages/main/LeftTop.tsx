import MotionSection from '@/components/pages/main/MotionSection';
import { Icon } from '@repo/ui';

export default function LeftTop() {
  return (
    <MotionSection className='w-full flex flex-col items-center'>
      <div className='w-[300px] h-[58px] bg-[#000DD50D] flex justify-center items-center rounded-[30px]'>
        <Icon iconName='webLogo' />
      </div>

      <p className='bold-heading5 text-deep-gray mt-[33px]'>
        태양광 사기는 이제 그만
      </p>

      <div className='relative w-full mt-[15px]'>
        <div className='absolute top-0 left-0 w-full'>
          <p className='heavy-heading5 lg:heavy-heading3 text-primary text-center'>
            투명한 견적
          </p>

          <div className='heavy-heading5 lg:heavy-heading3 text-primary text-center'>
            <span className='text-secondary'>솔라매치</span>
            <span>에서 비교하세요</span>
          </div>
        </div>

        <img src='/images/main-1.png' alt='main-1' />
      </div>
    </MotionSection>
  );
}
