import { Icon } from '@repo/ui';
import { cn } from '@repo/utils';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

export default function LayoutHeader() {
  return (
    <header className='fixed top-0 left-0 right-0 flex justify-between items-center h-[64px] lg:h-[80px] px-[30px] lg:px-[32px] bg-white z-50'>
      <Link href='/' role='link' aria-label='홈페이지'>
        <Icon iconName='webLogo' className='h-[20px] lg:h-[30px]' />
      </Link>

      {/* nav bar(center) */}
      <nav className='hidden lg:flex items-center gap-[34px]'>
        <LinkItem href='/' aria-label='홈페이지' isNav>
          홈페이지
        </LinkItem>
        <LinkItem href='/bidding' aria-label='실시간 입찰확인 페이지' isNav>
          실시간 입찰확인
        </LinkItem>
        <LinkItem href='/cases' aria-label='설치사례 페이지' isNav>
          설치사례
        </LinkItem>
        <LinkItem href='/support' aria-label='고객센터 페이지' isNav>
          고객센터
        </LinkItem>
      </nav>

      {/* right side */}
      <div className='hidden lg:flex items-center gap-[30px]'>
        <LinkItem href='/login' aria-label='로그인 페이지' isNav={false}>
          로그인
        </LinkItem>
        <LinkItem href='/signup' aria-label='회원가입 페이지' isNav={false}>
          회원가입
        </LinkItem>
      </div>

      <button className='lg:hidden'>
        <Icon iconName='hamburger' />
      </button>
    </header>
  );
}

interface LinkItemProps extends LinkProps {
  isNav: boolean;
}

function LinkItem({
  href,
  isNav,
  children,
  ...props
}: PropsWithChildren<LinkItemProps>) {
  return (
    <Link
      href={href}
      role='link'
      {...props}
      className={cn(
        isNav ? 'text-black' : 'text-[#666666]', // text color
        'bold-body hover:text-secondary' // font style
      )}
    >
      {children}
    </Link>
  );
}
