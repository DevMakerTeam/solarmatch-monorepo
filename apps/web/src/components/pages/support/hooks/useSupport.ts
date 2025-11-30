import { useGetQnaListQuery } from "@/api/qna/QnaApi.query";
import { useAccordion, usePageUrl } from "@repo/hooks";

const PAGE_SIZE = 5;

export const useSupport = () => {
  const { currentPage, handlePageChange } = usePageUrl();
  const qnaAccordion = useAccordion<number>();

  const { data, isLoading: isQnaListLoading } = useGetQnaListQuery({
    options: {
      enabled: !!currentPage,
    },
    variables: {
      page: currentPage,
      pageSize: PAGE_SIZE,
    },
  });
  const { data: qnaPagination } = data ?? {};
  const totalPages = qnaPagination?.totalPages ?? 0;
  const totalCount = qnaPagination?.total ?? 0;
  const qnaList = qnaPagination?.data ?? [];

  return {
    qnaList,
    totalPages,
    currentPage,
    handlePageChange,
    qnaAccordion,
    isQnaListLoading,
    totalCount,
  };
};
