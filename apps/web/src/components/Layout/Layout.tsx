import { LayoutHeader } from '@/components/Layout/components';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='relative'>
      <LayoutHeader />
      <main className='pt-[64px] lg:pt-[115px]'>{children}</main>
    </div>
  );
}
