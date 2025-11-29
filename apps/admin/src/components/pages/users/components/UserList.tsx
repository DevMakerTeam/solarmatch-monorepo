import { GetUsersModel } from "@/api/users/types/model/get-users-model";
import { Table } from "@tanstack/react-table";
import AdminTable from "@/components/AdminTable";
import AdminNonData from "@/components/AdminNonData";

interface UserListProps {
  table: Table<GetUsersModel["data"]["data"][number]>;
  handleRowClick: (row: GetUsersModel["data"]["data"][number]) => void;
  totalCount: number;
}

const UserList = ({ table, handleRowClick, totalCount }: UserListProps) => {
  if (!totalCount) {
    return <AdminNonData nonDataText="유저 데이터가 없습니다." />;
  }

  return <AdminTable table={table} onRowClick={handleRowClick} />;
};

export default UserList;
