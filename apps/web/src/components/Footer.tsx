import { Button, Icon } from "@repo/ui";
import { cn } from "@repo/utils";

const COMPANY_CONTACT = {
  MAIN_PHONE: "02-123-4567",
  CEO_NAME: "장윤호",
  CONTACT_EMAIL: "solarmatch@company.com",
  BUSINESS_REGISTRATION_NUMBER: "123-45-67890",
};

export default function Footer() {
  return (
    <div
      className={cn(
        // "pl-[44px] lg:pl-[380px]",
        // "pt-[28px] lg:pt-[38px]",
        // "pb-[60px]",
        "w-full bg-light-gray"
      )}
    >
      {/* mobile */}
      <div className="flex flex-col xl:hidden p-[42px]">
        <Icon iconName="webLogo" className="w-[174px] h-[20px] text-primary" />

        <div className="flex flex-col mt-[42px]">
          <p className="bold-body">대표전화</p>
          <p className="bold-heading3">{COMPANY_CONTACT.MAIN_PHONE}</p>
        </div>

        <div className="flex flex-col gap-[12px] mt-[27px]">
          <div className="flex items-center gap-[20px]">
            <p className="bold-body w-[100px]">대표이사</p>
            <p className="medium-body">{COMPANY_CONTACT.CEO_NAME}</p>
          </div>
          <div className="flex items-center gap-[20px]">
            <p className="bold-body w-[100px]">E-mail</p>
            <p className="medium-body">{COMPANY_CONTACT.CONTACT_EMAIL}</p>
          </div>
          <div className="flex items-center gap-[20px]">
            <p className="bold-body w-[100px]">사업자등록번호</p>
            <p className="medium-body">
              {COMPANY_CONTACT.BUSINESS_REGISTRATION_NUMBER}
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-fit mt-[8px]">
          사업자정보확인
        </Button>

        <div className="flex items-center gap-[20px] mt-[15px] text-deep-gray bold-body">
          <p>이용약관</p>

          <div className="w-[1px] h-[17px] border-1 border-border-color"></div>

          <p>개인정보처리방침</p>

          <div className="w-[1px] h-[17px] border-1 border-border-color"></div>

          <p>자주 묻는 질문</p>
        </div>
      </div>

      {/* desktop */}
      <div className="hidden xl:flex pt-[38px] pb-[54px] w-full justify-center">
        <div className="w-full flex items-start justify-between mx-auto max-w-[1200px]">
          <Icon
            iconName="webLogo"
            className="w-[174px] h-[20px] text-primary mt-[14px]"
          />

          <div className="flex flex-col gap-[52px]">
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center gap-[20px]">
                <p className="bold-body w-[100px]">대표이사</p>
                <p className="medium-body">{COMPANY_CONTACT.CEO_NAME}</p>
              </div>
              <div className="flex items-center gap-[20px]">
                <p className="bold-body w-[100px]">E-mail</p>
                <p className="medium-body">{COMPANY_CONTACT.CONTACT_EMAIL}</p>
              </div>
              <div className="flex items-center gap-[20px]">
                <p className="bold-body w-[100px]">사업자등록번호</p>
                <p className="medium-body">
                  {COMPANY_CONTACT.BUSINESS_REGISTRATION_NUMBER}
                </p>
                <Button variant="outline" size="sm" className="w-fit mt-[8px]">
                  사업자정보확인
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-[32px] text-deep-gray bold-body">
              <p>이용약관</p>

              <div className="w-[1px] h-[17px] border-1 border-border-color"></div>

              <p>개인정보처리방침</p>

              <div className="w-[1px] h-[17px] border-1 border-border-color"></div>

              <p>자주 묻는 질문</p>
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="bold-body">대표전화</p>
            <p className="bold-heading3">{COMPANY_CONTACT.MAIN_PHONE}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
