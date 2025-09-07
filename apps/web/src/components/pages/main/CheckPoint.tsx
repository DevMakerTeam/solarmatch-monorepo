import { cn } from '@repo/utils';
import { ReactNode } from 'react';

interface CheckPointProps {
  index: number;
  image: ReactNode;
  contents: ReactNode;
}

export default function CheckPoint({
  index,
  image,
  contents,
}: CheckPointProps) {
  const isRight = index % 2 === 0;

  const contentsElement = (
    <div
      className={cn('flex flex-col w-full', isRight && 'items-end text-end')}
    >
      <div className='p-[9px_20px] bg-primary w-fit bold-heading6 text-white rounded-[30px] mb-[12px]'>{`체크 포인트${index}`}</div>
      {contents}
    </div>
  );

  return (
    <div className='flex gap-[35px] justify-between w-full'>
      {isRight ? (
        <>
          {image}
          {contentsElement}
        </>
      ) : (
        <>
          {contentsElement}
          {image}
        </>
      )}
    </div>
  );
}
