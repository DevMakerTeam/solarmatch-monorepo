import { GetUsersModel } from "@/api/users/types/model/get-users-model";
import { cn } from "@repo/utils";
import { flexRender, Table } from "@tanstack/react-table";

interface UserListProps {
  table: Table<GetUsersModel["data"]["data"][number]>;
  handleRowClick: (row: GetUsersModel["data"]["data"][number]) => void;
}

const UserList = ({ table, handleRowClick }: UserListProps) => {
  return (
    <div className="w-full overflow-x-auto mb-[40px] lg:mb-[50px]">
      <table className="w-max min-w-full table-fixed">
        <colgroup>
          {table.getHeaderGroups()[0]?.headers.map(header => (
            <col
              key={header.id}
              style={{
                width: `${100 / table.getHeaderGroups()[0]?.headers.length}%`,
              }}
            />
          ))}
        </colgroup>
        <thead className="bg-primary text-white text-nowrap">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                const isFirst = index === 0;
                const isLast = index === headerGroup.headers.length - 1;
                return (
                  <th
                    key={header.id}
                    className={cn(
                      "text-left box-border py-[15px] px-4 first:rounded-l-[4px] last:rounded-r-[4px]",
                      isFirst && "pl-12",
                      isLast && "pr-12"
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="bold-body">
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="border-b border-border-color cursor-pointer hover:bg-light-gray transition-colors"
              onClick={() => handleRowClick(row.original)}
            >
              {row.getVisibleCells().map((cell, index) => {
                const isFirst = index === 0;
                const isLast = index === row.getVisibleCells().length - 1;
                return (
                  <td
                    key={cell.id}
                    className={cn(
                      "box-border py-[15px] px-4",
                      isFirst && "pl-12",
                      isLast && "pr-12"
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
