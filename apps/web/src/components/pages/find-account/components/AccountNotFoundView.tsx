import { Button } from "@repo/ui/button";
import Image from "next/image";
import Link from "next/link";

const AccountNotFoundView = () => {
  return (
    <>
      <div className="flex flex-col text-center medium-heading6 mb-[60px] lg:mb-[75px]">
        <p>입력하신 정보에 연결되어 있는</p>
        <p>계정이 없습니다.</p>
      </div>

      <div className="w-[111px] h-[111px] lg:w-[168px] lg:h-[168px] relative mx-auto mb-[75px] lg:mb-[85px]">
        <Image
          src="/images/find-account/account-not-found.png"
          alt="계정 없음"
          fill
          className="object-contain"
        />
      </div>

      <Link href="/signup">
        <Button className="button-size-xl">회원가입</Button>
      </Link>
    </>
  );
};

export default AccountNotFoundView;
