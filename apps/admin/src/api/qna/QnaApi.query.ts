import { isNotNullish, Parameter, UseQueryParams } from "@repo/types";
import qnaApi from "./QnaApi";
import { useQuery } from "@tanstack/react-query";

export const QNA_API_QUERY_KEY = {
  GET_QNA_LIST: (params?: Parameter<typeof qnaApi.getQnaList>) =>
    ["get-qna-list", params].filter(isNotNullish),
  GET_QNA_DETAIL: (params?: Parameter<typeof qnaApi.getQnaDetail>) =>
    ["get-qna-detail", params].filter(isNotNullish),
};

// QnA 목록 조회
export const useGetQnaListQuery = (
  params?: UseQueryParams<typeof qnaApi.getQnaList>
) => {
  const queryKey = QNA_API_QUERY_KEY.GET_QNA_LIST(params?.variables);

  return useQuery({
    queryKey,
    queryFn: () => qnaApi.getQnaList(params?.variables),
    ...params?.options,
  });
};

// QnA 상세 조회
export const useGetQnaDetailQuery = (
  params: UseQueryParams<typeof qnaApi.getQnaDetail>
) => {
  const queryKey = QNA_API_QUERY_KEY.GET_QNA_DETAIL(params?.variables);

  return useQuery({
    queryKey,
    queryFn: () => qnaApi.getQnaDetail(params.variables),
    ...params?.options,
  });
};
