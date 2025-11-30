import { cn } from "@repo/utils";
import { flexRender, Table } from "@tanstack/react-table";
import { NonData } from "@repo/ui";

interface AdminTableProps<TData> {
  table: Table<TData>;
  onRowClick?: (row: TData) => void;
  getCellClassName?: (cell: { id: string; column: { id: string } }) => string;
  nonDataText: string;
}

function AdminTable<TData>({
  table,
  onRowClick,
  getCellClassName,
  nonDataText,
}: AdminTableProps<TData>) {
  const hasData = table.getCoreRowModel().rows.length > 0;

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
        {hasData && (
          <tbody className="bold-body">
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className={cn(
                  "border-b border-border-color",
                  onRowClick &&
                    "cursor-pointer hover:bg-light-gray transition-colors"
                )}
                onClick={() => onRowClick?.(row.original)}
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
                        isLast && "pr-12",
                        getCellClassName?.(cell)
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {!hasData && <NonData nonDataText={nonDataText} className="w-full" />}
    </div>
  );
}

export default AdminTable;
