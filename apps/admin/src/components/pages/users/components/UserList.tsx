import { GetUsersModel } from "@/api/users/types/model/get-users-model";
import { Table } from "@tanstack/react-table";
import AdminTable from "@/components/AdminTable";

interface UserListProps {
  table: Table<GetUsersModel["data"]["data"][number]>;
  handleRowClick: (row: GetUsersModel["data"]["data"][number]) => void;
}

const UserList = ({ table, handleRowClick }: UserListProps) => {
  return <AdminTable table={table} onRowClick={handleRowClick} />;
};

export default UserList;
