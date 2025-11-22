import AdminRootLayout from "@/components/layouts/root";
import useUsers from "./hooks/useUsers";
import { Button } from "@repo/ui/button";
import { cn } from "@repo/utils";
import { Checkbox } from "@repo/ui/checkbox";
import { Pagination } from "@repo/ui/pagination";
import UserList from "./components/UserList";

const UsersPage = () => {
  const {
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
    isUsersExcelDownloadPending,
  } = useUsers();

  return (
    <AdminRootLayout>
      {/* top */}
      <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-0 lg:justify-between items-center w-full mb-[15px] lg:mb-[40px]">
        <div className="w-full lg:w-fit flex items-center justify-between lg:justify-baseline gap-0 lg:gap-[50px]">
          <h1 className="bold-heading6 lg:bold-heading5 text-primary">
            회원 관리
          </h1>

          <div className="flex items-center gap-[14px]">
            <Button
              variant="ghost"
              className={cn(
                userType === "USER" ? "text-primary" : "text-middle-gray"
              )}
              onClick={() => handleTypeChange("user")}
            >
              일반
            </Button>

            <div className="w-[1px] h-[16px] border-r-1 border-primary"></div>

            <Button
              variant="ghost"
              className={cn(
                userType === "PARTNER" ? "text-primary" : "text-middle-gray"
              )}
              onClick={() => handleTypeChange("partner")}
            >
              파트너
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-fit flex flex-col lg:flex-row gap-[15px] lg:gap-[30px] lg:items-center">
          <Button
            variant="outline"
            className="button-size-md w-full lg:w-[122px] order-1 lg:order-2"
            onClick={handleUsersExcelDownload}
            isLoading={isUsersExcelDownloadPending}
          >
            고객정보추출
          </Button>

          <div className="flex items-center gap-[12px] justify-end order-2 lg:order-1 cursor-pointer">
            <Checkbox
              id="showDeletedOnly"
              checked={showDeletedOnly}
              onChange={e => handleShowDeletedOnlyChange(e.target.checked)}
            />
            <label
              htmlFor="showDeletedOnly"
              className="medium-caption lg:medium-body cursor-pointer"
            >
              탈퇴 회원만 보기
            </label>
          </div>
        </div>
      </div>

      {/* list */}
      <UserList table={table} handleRowClick={handleRowClick} />

      {/* pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </AdminRootLayout>
  );
};

export default UsersPage;
