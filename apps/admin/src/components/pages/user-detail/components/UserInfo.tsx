import { GetUserDetailModel } from "@/api/users/types/model/get-user-detail-model";
import { Button } from "@repo/ui/button";
import { formatPhoneNumberKR } from "@repo/utils";
import { ReactNode } from "react";

interface UserInfoProps {
  userData?: Partial<
    Pick<
      GetUserDetailModel["data"],
      "name" | "email" | "phone" | "provider" | "isActive" | "id"
    >
  >;
  handleDeleteUser: (id?: number) => void;
}

const UserInfo = ({ userData, handleDeleteUser }: UserInfoProps) => {
  const { name, email, phone, provider, isActive, id } = userData || {};

  return (
    <div className="flex flex-col gap-[24px] lg:gap-[40px] lg:min-w-[330px]">
      <div className="flex items-center gap-[15px]">
        <div className="w-[px] border-[2px] border-primary h-[24px] lg:h-[32px]" />

        <h2 className="bold-body lg:bold-heading6 text-primary">기본 정보</h2>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-y-[15px] lg:gap-y-[25px] gap-x-[50px]">
        <UserInfoItem field="이름" value={name} />
        <UserInfoItem field="이메일" value={email} />
        <UserInfoItem
          field="휴대전화 번호"
          value={phone ? formatPhoneNumberKR(phone) : phone}
        />
        <UserInfoItem
          field="유저타입"
          value={provider === "LOCAL" ? "일반" : "카카오"}
        />
        <UserInfoItem
          field="탈퇴 처리 여부"
          value={
            isActive ? (
              <Button
                variant="ghost"
                className="w-fit medium-body underline underline-offset-3"
                onClick={() => handleDeleteUser(id)}
              >
                탈퇴처리
              </Button>
            ) : (
              "탈퇴 완료"
            )
          }
        />
      </div>
    </div>
  );
};

export default UserInfo;

const UserInfoItem = ({
  field,
  value,
}: {
  field: string;
  value: string | ReactNode;
}) => {
  return (
    <>
      <span className="text-primary bold-body text-nowrap">{field}</span>

      {typeof value === "string" ? (
        <span className="bold-body">{value}</span>
      ) : (
        value
      )}
    </>
  );
};
