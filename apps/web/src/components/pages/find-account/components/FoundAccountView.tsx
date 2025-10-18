import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import Link from "next/link";

const FoundAccountView = () => {
  return (
    <>
      <div className="flex flex-col text-center medium-heading6 mb-[45px] lg:mb-[60px]">
        <p>입력하신 정보에 연결되어 있는</p>
        <p>계정 2건이 검색되었습니다.</p>
      </div>

      <div className="w-full rounded-[8px] border-border-color border-[1px] py-[43px] px-[54px] lg:px-[80px] flex flex-col gap-[20px] mb-[45px] lg:mb-[55px]">
        <div className="flex items-center gap-[10px]">
          <div className="w-[48px] h-[48px] rounded-full bg-kakao flex justify-center items-center">
            <Icon iconName="kakao" className="w-[25px]" />
          </div>

          <span className="bold-body">ab********@hanmail.net</span>
        </div>

        <div className="flex items-center gap-[10px]">
          <div className="w-[48px] h-[48px] rounded-full bg-primary flex justify-center items-center">
            <Icon iconName="mail" className="w-[24.5px] text-white" />
          </div>

          <span className="bold-body">ab********@naver.com</span>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] w-full">
        <Link href="/login">
          <Button className="button-size-xl">로그인</Button>
        </Link>

        <Link href="/change-password">
          <Button variant="outline" className="button-size-xl">
            비밀번호 재설정
          </Button>
        </Link>
      </div>
    </>
  );
};

export default FoundAccountView;
