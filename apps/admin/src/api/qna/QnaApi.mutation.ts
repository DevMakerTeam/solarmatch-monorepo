import { isNotNullish, Parameter, UseMutationParams } from "@repo/types";
import qnaApi from "./QnaApi";
import { useMutation } from "@tanstack/react-query";

export const QNA_API_MUTATION_KEY = {
  CREATE_QNA: (params?: Parameter<typeof qnaApi.createQna>) =>
    ["create-qna", params].filter(isNotNullish),
  EDIT_QNA: (params?: Parameter<typeof qnaApi.editQna>) =>
    ["edit-qna", params].filter(isNotNullish),
  DELETE_QNA: (params?: Parameter<typeof qnaApi.deleteQna>) =>
    ["delete-qna", params].filter(isNotNullish),
};

// QnA 등록
export const useCreateQnaMutation = (
  params?: UseMutationParams<typeof qnaApi.createQna>
) => {
  return useMutation({
    mutationFn: qnaApi.createQna,
    ...params?.options,
  });
};

// QnA 수정
export const useEditQnaMutation = (
  params?: UseMutationParams<typeof qnaApi.editQna>
) => {
  return useMutation({
    mutationFn: qnaApi.editQna,
    ...params?.options,
  });
};

// QnA 삭제
export const useDeleteQnaMutation = (
  params?: UseMutationParams<typeof qnaApi.deleteQna>
) => {
  return useMutation({
    mutationFn: qnaApi.deleteQna,
    ...params?.options,
  });
};
