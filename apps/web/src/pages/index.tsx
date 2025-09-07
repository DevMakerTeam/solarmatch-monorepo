import Layout from '@/components/Layout';
import CheckPoint1 from '@/components/pages/main/CheckPoint1';
import CheckPoint2 from '@/components/pages/main/CheckPoint2';
import CheckPoint3 from '@/components/pages/main/CheckPoint3';
import CheckPoint4 from '@/components/pages/main/CheckPoint4';
import LeftTop from '@/components/pages/main/LeftTop';

export default function Home() {
  return (
    <Layout>
      <div className='flex justify-between gap-[30px]'>
        {/* left side */}
        <div className='w-full pt-[27px] flex flex-col items-center'>
          <LeftTop />
          <div className='flex flex-col gap-[120px] w-full'>
            <CheckPoint1 />
            <CheckPoint2 />
            <CheckPoint3 />
            <CheckPoint4 />
            {/* 시공사례 */}
          </div>
        </div>

        {/* right side */}
        <div className='hidden xl:flex w-full max-w-[396px] border border-border-color rounded-lg sticky top-[80px] self-start'>
          ㅁㄴㅇㄴ
        </div>
      </div>
    </Layout>
  );
}
