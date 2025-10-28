import { cn } from "@repo/utils";
import { PaginationProps } from ".";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { usePagination } from "./hooks/usePagination";

const Pagination = ({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) => {
  const { pageNumbers, canGoFirst, canGoPrev, canGoNext, canGoLast } =
    usePagination({ currentPage, totalPages });

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex items-center gap-[15px] lg:gap-[30px]">
        {/* left */}
        <div className="flex items-center gap-[12px]">
          <Button
            variant="ghost"
            disabled={!canGoFirst}
            onClick={() => handlePageChange(1)}
            className="disabled:cursor-not-allowed disabled:opacity-50"
            icon={
              <Icon
                iconName="chevronFirst"
                className="w-3 h-3 text-deep-gray"
              />
            }
          />

          <Button
            variant="ghost"
            disabled={!canGoPrev}
            onClick={() => handlePageChange(currentPage - 1)}
            className="disabled:cursor-not-allowed disabled:opacity-50"
            icon={
              <Icon iconName="chevronLeft" className="w-3 h-3 text-deep-gray" />
            }
          />
        </div>

        {/* center */}
        <div className="flex items-center gap-[15px] lg:gap-[20px]">
          {pageNumbers.map(page => (
            <div
              onClick={() => handlePageChange(page)}
              key={`pagination-page-${page}`}
              className={cn(
                "w-[30px] h-[30px] rounded-full flex items-center justify-center regular-body cursor-pointer",
                page === currentPage && "bg-primary text-white"
              )}
            >
              {page}
            </div>
          ))}
        </div>

        {/* right */}
        <div className="flex items-center gap-[12px]">
          <Button
            variant="ghost"
            disabled={!canGoNext}
            onClick={() => handlePageChange(currentPage + 1)}
            className="disabled:cursor-not-allowed disabled:opacity-50"
            icon={
              <Icon
                iconName="chevronRight"
                className="w-3 h-3 text-deep-gray"
              />
            }
          />

          <Button
            variant="ghost"
            disabled={!canGoLast}
            onClick={() => handlePageChange(totalPages)}
            icon={
              <Icon iconName="chevronLast" className="w-3 h-3 text-deep-gray" />
            }
            className="disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
