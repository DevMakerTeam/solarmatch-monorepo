import { ReactNode } from "react";
import SectionHeader from "./SectionHeader";
import UserInfoItem from "./UserInfoItem";

interface InfoSectionProps {
  title: string;
  items: Array<{
    field: string;
    value: string | ReactNode;
  }>;
  className?: string;
}

const InfoSection = ({ title, items, className }: InfoSectionProps) => {
  return (
    <div
      className={`flex flex-col gap-[24px] lg:gap-[40px] ${className || ""}`}
    >
      <SectionHeader title={title} />
      <div className="grid grid-cols-[auto_1fr] gap-y-[15px] lg:gap-y-[25px] gap-x-[50px]">
        {items.map((item, index) => (
          <UserInfoItem key={index} field={item.field} value={item.value} />
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
