import { useDeleteQnaMutation } from "@/api/qna/QnaApi.mutation";
import { QNA_API_QUERY_KEY, useGetQnaListQuery } from "@/api/qna/QnaApi.query";
import { useAccordion, usePageUrl } from "@repo/hooks";
import { useQueryClient } from "@tanstack/react-query";

const PAGE_SIZE = 7;

export const useSupport = () => {
  const { currentPage, handlePageChange } = usePageUrl();
  const faqAccordion = useAccordion<number>();

  const queryClient = useQueryClient();

  // QnA 목록 조회
  const { data } = useGetQnaListQuery({
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
  const qnaList = qnaPagination?.data ?? [];

  // QnA 삭제
  const { mutate: deleteQnaMutation } = useDeleteQnaMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QNA_API_QUERY_KEY.GET_QNA_LIST({
            page: currentPage,
            pageSize: PAGE_SIZE,
          }),
        });
      },
    },
  });
  const handleDeleteQna = (id: number) => {
    deleteQnaMutation(id);
  };

  return {
    qnaList,
    totalPages,
    currentPage,
    handlePageChange,
    faqAccordion,
    handleDeleteQna,
  };
};
