import { useCallback, useMemo } from "react";
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
import { useUsersExcelDownloadMutation } from "@/api/users/UsersApi.mutation";

const PAGE_SIZE = 9;

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

  // 또는 handleRowClick 함수로 바로 라우팅
  const handleRowClick = useCallback(
    (row: GetUsersModel["data"]["data"][number]) => {
      const userId =
        userType === "PARTNER" ? row.partnerInfo?.userId : row.userInfo?.id;

      if (userId) {
        router.push(`/users/${userId}`);
      }
    },
    [userType, router]
  );

  // 회원 목록 엑셀 다운로드
  const { mutate: usersExcelDownload } = useUsersExcelDownloadMutation({
    options: {
      onSuccess: ({ blob, timestamp }) => {
        const serverDate = new Date(timestamp);
        const year = serverDate.getFullYear();
        const month = String(serverDate.getMonth() + 1).padStart(2, "0");
        const day = String(serverDate.getDate()).padStart(2, "0");
        const hours = String(serverDate.getHours()).padStart(2, "0");
        const minutes = String(serverDate.getMinutes()).padStart(2, "0");
        const seconds = String(serverDate.getSeconds()).padStart(2, "0");
        const dateTime = `${year}${month}${day}_${hours}${minutes}${seconds}`;
        const userTypeLabel = userType === "PARTNER" ? "PARTNER" : "USER";
        const filename = `회원목록_${userTypeLabel}_${dateTime}.xlsx`;

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(url);
      },
    },
  });
  const handleUsersExcelDownload = useCallback(() => {
    usersExcelDownload({
      type: userType,
      showDeletedOnly,
    });
  }, [userType, showDeletedOnly, usersExcelDownload]);

  return {
    totalPages,
    currentPage,
    handlePageChange,
    userType,
    handleTypeChange,
    showDeletedOnly,
    handleShowDeletedOnlyChange,
    table,
    handleRowClick,
    handleUsersExcelDownload,
  };
};

export default useUsers;
