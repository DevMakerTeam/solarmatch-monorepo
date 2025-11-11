import { FindAccountModelData } from "@/api/auth/types/model/find-account-model";
import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { cn } from "@repo/utils";
import Link from "next/link";

interface FoundAccountViewProps {
  foundAccounts: FindAccountModelData[];
}

const FoundAccountView = ({ foundAccounts }: FoundAccountViewProps) => {
  return (
    <>
      <div className="flex flex-col text-center medium-heading6 mb-[45px] lg:mb-[60px]">
        <p>입력하신 정보에 연결되어 있는</p>
        <p>{`계정 ${foundAccounts.length}건이 검색되었습니다.`}</p>
      </div>

      <div className="w-full rounded-[8px] border-border-color border-[1px] py-[43px] px-[54px] lg:px-[80px] flex flex-col gap-[20px] mb-[45px] lg:mb-[55px]">
        {foundAccounts.map(account => (
          <FoundAccountItem key={account.createdAt} account={account} />
        ))}
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

const FoundAccountItem = ({ account }: { account: FindAccountModelData }) => {
  const { maskedEmail, provider } = account;

  return (
    <div className="flex items-center gap-[10px]">
      <div
        className={cn(
          "min-w-[48px] h-[48px] rounded-full flex justify-center items-center",
          provider === "KAKAO" ? "bg-kakao" : "bg-primary text-white"
        )}
      >
        <Icon
          iconName={provider === "KAKAO" ? "kakao" : "mail"}
          className="w-[25px]"
        />
      </div>

      <span className="bold-body">{maskedEmail}</span>
    </div>
  );
};
