// 로그인 페이지

import RootLayout from "@/components/Layout/root";
import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { Input } from "@repo/ui/input";
import Link from "next/link";

const LoginPage = () => {
  return (
    <RootLayout>
      <div className="layout-padding-y">
        <h1 className="bold-heading4 lg:bold-heading3 text-center mb-[55px]">
          로그인
        </h1>

        <div className="flex justify-center items-center mx-auto medium-heading6 mb-[35px] lg:mb-[50px]">
          <span>회원이 아니시라면?&nbsp;&nbsp;</span>
          <Link
            href="/signup"
            className="text-[#00087E] underline underline-offset-2"
          >
            회원가입
          </Link>
        </div>

        <div className="max-w-[454px] flex flex-col items-center mx-auto">
          <Button
            icon={<Icon iconName="kakao" className="w-[33px]" />}
            variant="kakao"
            className="button-size-xl"
          >
            카카오 로그인
          </Button>

          <hr className="h-[1px] w-full border-border-color my-[35px]"></hr>

          <Input
            className="input-size-lg mb-[10px]"
            placeholder="아이디를 입력해주세요"
          />
          <Input
            className="input-size-lg mb-[20px]"
            placeholder="비밀번호를 입력해주세요"
          />

          <Button className="button-size-xl mb-[35px]">로그인</Button>

          <div className="mx-auto flex items-center">
            <Link href="find-account">계정 찾기</Link>

            <hr className="w-[1px] h-[10px] bg-border-color border-border-color mx-[20px] lg:mx-[35px]"></hr>

            <Link href="change-password">비밀번호 변경하기</Link>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default LoginPage;
