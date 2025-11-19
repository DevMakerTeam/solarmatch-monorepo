import { useMemo } from "react";
import { GetUsersModel } from "@/api/users/types/model/get-users-model";
import { useGetUsersQuery } from "@/api/users/UsersApi.query";
import { usePageUrl } from "@repo/hooks";
import { useRouter } from "next/router";
import { Role } from "@repo/types";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ApplyStatus from "../components/ApplyStatus";

const PAGE_SIZE = 10;

const useUsers = () => {
  const { currentPage, handlePageChange } = usePageUrl();
  const router = useRouter();

  // URL 파라미터에서 type 읽기 (없으면 기본값 "user")
  const typeParam = router.query.type as string | undefined;
  const userType = useMemo(() => {
    if (typeParam === "partner") {
      return "PARTNER" as Role;
    }
    return "USER" as Role;
  }, [typeParam]);

  // URL 파라미터에서 showDeletedOnly 읽기 (없으면 기본값 false)
  const showDeletedOnlyParam = router.query.showDeletedOnly as
    | string
    | undefined;
  const showDeletedOnly = useMemo(() => {
    return showDeletedOnlyParam === "true";
  }, [showDeletedOnlyParam]);

  const { data } = useGetUsersQuery({
    options: {
      enabled: !!currentPage,
    },
    variables: {
      page: currentPage,
      pageSize: PAGE_SIZE,
      type: userType,
      showDeletedOnly,
    },
  });
  const { data: usersPagination } = data || {};
  const totalPages = usersPagination?.totalPages ?? 0;
  const usersList = usersPagination?.data ?? [];

  const columnHelper =
    createColumnHelper<GetUsersModel["data"]["data"][number]>();
  const columns = useMemo(() => {
    if (userType === "PARTNER") {
      return [
        columnHelper.accessor("partnerInfo.companyName", {
          cell: info => info.getValue(),
          header: "업체명",
        }),
        columnHelper.accessor("partnerInfo.representativeName", {
          cell: info => info.getValue(),
          header: "대표 이름",
        }),
        columnHelper.accessor("partnerInfo.companyEmail", {
          cell: info => info.getValue(),
          header: "업체 이메일",
        }),
        columnHelper.accessor("partnerInfo.phone", {
          cell: info => info.getValue(),
          header: "업체 대표 번호",
        }),
        columnHelper.accessor("partnerInfo.experienceYears", {
          cell: info => `${info.getValue()}년`,
          header: "활동 경력",
        }),
        columnHelper.accessor("partnerInfo.status", {
          cell: info => <ApplyStatus value={info.getValue()} />,
          header: "가입승인여부",
        }),
      ];
    } else {
      return [
        columnHelper.accessor("userInfo.name", {
          cell: info => info.getValue(),
          header: "이름",
        }),
        columnHelper.accessor("userInfo.email", {
          cell: info => info.getValue(),
          header: "이메일",
        }),
        columnHelper.accessor("userInfo.phone", {
          cell: info => info.getValue(),
          header: "휴대전화 번호",
        }),
      ];
    }
  }, [userType]);
  const table = useReactTable({
    data: usersList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // type 변경 함수
  const handleTypeChange = (type: "user" | "partner") => {
    const { page, type: _, showDeletedOnly: __, ...restQuery } = router.query;
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...restQuery,
          ...(type === "user" ? {} : { type }),
          ...(showDeletedOnly ? { showDeletedOnly: "true" } : {}),
        },
      },
      undefined,
      { shallow: true }
    );
  };

  // showDeletedOnly 변경 함수
  const handleShowDeletedOnlyChange = (checked: boolean) => {
    const { page, type, showDeletedOnly: _, ...restQuery } = router.query;
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...restQuery,
          ...(type ? { type } : {}),
          ...(checked ? { showDeletedOnly: "true" } : {}),
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return {
    totalPages,
    currentPage,
    handlePageChange,
    userType,
    handleTypeChange,
    showDeletedOnly,
    handleShowDeletedOnlyChange,
    table,
  };
};

export default useUsers;
