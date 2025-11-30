import { cn } from "@repo/utils";
import { ReactNode } from "react";

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
      className={cn(
        "flex flex-col w-full",
        isRight && "md:items-end md:text-end"
      )}
    >
      <div className="w-[108px] h-[32px] flex items-center justify-center bg-primary bold-caption md:bold-body text-white rounded-[30px] mb-[12px]">{`체크 포인트${index}`}</div>
      {contents}
    </div>
  );

  return (
    <>
      <div className="gap-[35px] justify-between w-full hidden md:flex">
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

      <div className="flex flex-col items-center md:hidden">
        {contentsElement}

        {image}
      </div>
    </>
  );
}
