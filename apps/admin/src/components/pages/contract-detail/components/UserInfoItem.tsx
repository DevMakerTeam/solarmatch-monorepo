import { ReactNode } from "react";

interface UserInfoItemProps {
  field: string;
  value: string | ReactNode;
}

const UserInfoItem = ({ field, value }: UserInfoItemProps) => {
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

export default UserInfoItem;
