import Layout from '@/components/Layout';
import CheckPoint1 from '@/components/pages/main/CheckPoint1';
import CheckPoint2 from '@/components/pages/main/CheckPoint2';
import CheckPoint3 from '@/components/pages/main/CheckPoint3';
import CheckPoint4 from '@/components/pages/main/CheckPoint4';
import ContractProcess from '@/components/pages/main/ContractProcess';
import Dashboard from '@/components/pages/main/Dashboard';
import LeftTop from '@/components/pages/main/LeftTop';
import Portfolio from '@/components/pages/main/Portfolio';

export default function Home() {
  return (
    <Layout>
      <div className='flex justify-between gap-[30px]'>
        {/* left side */}
        <div className='w-full pt-[27px] flex flex-col items-center'>
          <LeftTop />
          <div className='flex flex-col gap-[60px] md:gap-[120px] w-full'>
            {/* 체크포인트 1~4 */}
            <CheckPoint1 />
            <CheckPoint2 />
            <CheckPoint3 />
            <CheckPoint4 />
          </div>
          {/* 시공사례 */}
          <Portfolio />
          {/* 계약 프로세스 */}
          <ContractProcess />
          {/* 대쉬보드 */}
          <Dashboard />

          {/*  */}
        </div>

        {/* right side */}
        <div className='hidden xl:flex w-full max-w-[396px] border border-border-color rounded-lg sticky top-[80px] self-start'>
          ㅁㄴㅇㄴ
        </div>
      </div>
    </Layout>
  );
}
