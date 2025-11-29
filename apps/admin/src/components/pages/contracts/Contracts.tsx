import AdminRootLayout from "@/components/layouts/root";
import { useContracts } from "./hooks/useContracts";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { GetContractsModel } from "@/api/contract/types/model/get-contracts-model";
import { useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Pagination } from "@repo/ui/pagination";
import AdminTable from "@/components/AdminTable";
import AdminLoading from "@/components/AdminLoading";

const ContractsPage = () => {
  const router = useRouter();
  const {
    contractsList,
    totalPages,
    currentPage,
    handlePageChange,
    isContractsListLoading,
    totalCount,
  } = useContracts();

  const columnHelper =
    createColumnHelper<GetContractsModel["data"]["data"][number]>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("contractName", {
        id: "contractName",
        header: "구분",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor("structureType", {
        header: "타입",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor("installationType", {
        header: "설치 방식",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor("companyName", {
        header: "입찰 업체",
        cell: info => info.getValue(),
      }),
      columnHelper.accessor("contractDate", {
        header: "계약일",
        cell: info => dayjs(info.getValue()).format("YYYY-MM-DD"),
      }),
      columnHelper.accessor("contractAmount", {
        header: "계약 금액(만원)",
        cell: info =>
          info.getValue().toLocaleString("ko-KR", { currency: "KRW" }),
      }),
    ];
  }, [columnHelper]);

  const table = useReactTable({
    data: contractsList || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = useCallback(
    (row: GetContractsModel["data"]["data"][number]) => {
      router.push(`/contracts/${row.id}`);
    },
    [router]
  );

  if (isContractsListLoading) {
    return <AdminLoading />;
  }

  return (
    <AdminRootLayout>
      <h1 className="mb-[16px] lg:mb-[50px] bold-heading6 lg:bold-heading5 text-primary">
        계약 관리
      </h1>

      {/* 테이블 */}
      <AdminTable
        table={table}
        onRowClick={handleRowClick}
        nonDataText="계약 데이터가 없습니다."
      />

      {/* pagination */}
      {!!totalCount && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages ?? 1}
          onPageChange={handlePageChange}
        />
      )}
    </AdminRootLayout>
  );
};

export default ContractsPage;
