import { useRouter } from "next/router";
import { useHookForm } from "./useHookForm";
import {
  useCreateQnaMutation,
  useEditQnaMutation,
} from "@/api/qna/QnaApi.mutation";
import {
  QNA_API_QUERY_KEY,
  useGetQnaDetailQuery,
} from "@/api/qna/QnaApi.query";
import { useEffect } from "react";
import { useModals } from "@repo/hooks";
import { ConfirmModal } from "@repo/ui/modal";
import { useQueryClient } from "@tanstack/react-query";

export const useSupportForm = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const idSlot = router.query.id;
  const isRouterReady = router.isReady;

  // QnA 상세 조회
  const { data: qnaDetailData } = useGetQnaDetailQuery({
    options: {
      enabled: !!idSlot,
    },
    variables: Number(idSlot),
  });
  const { data: qnaDetail } = qnaDetailData || {};
  const { answer: detailAnswer, question: detailQuestion } = qnaDetail || {};

  const formMethods = useHookForm();
  const {
    control,
    formState: { isValid, isDirty },
    reset,
  } = formMethods;
  const isEditMode = !!idSlot;
  const isFormEditDirty = !isEditMode || isDirty;
  const isFormValid = isValid && isRouterReady && isFormEditDirty;
  useEffect(() => {
    reset({
      question: detailQuestion,
      answer: detailAnswer,
    });
  }, [detailAnswer, detailQuestion, reset]);

  // QnA 등록
  const { mutate: createQnaMutation } = useCreateQnaMutation({
    options: {
      onSuccess: () => {
        router.push("/support");
        queryClient.invalidateQueries({
          queryKey: QNA_API_QUERY_KEY.GET_QNA_LIST(),
        });
      },
    },
  });
  // QnA 수정
  const { mutate: editQnaMutation } = useEditQnaMutation({
    options: {
      onSuccess: () => {
        router.push("/support");
        queryClient.invalidateQueries({
          queryKey: QNA_API_QUERY_KEY.GET_QNA_LIST(),
        });
      },
    },
  });
  const handleSubmit = formMethods.handleSubmit(data => {
    if (isEditMode) {
      editQnaMutation({ id: Number(idSlot), ...data });
    } else {
      createQnaMutation(data);
    }
  });

  // 취소 버튼
  const { open: openCancelConfirmModal, close: closeCancelConfirmModal } =
    useModals();
  const handleCancel = () => {
    if (!isFormEditDirty) {
      router.back();
      return;
    }

    openCancelConfirmModal(ConfirmModal, {
      text: `작성 내용이 저장되지 않았습니다.\n작성을 취소하시겠습니까?`,
      onConfirm: () => {
        router.back();
        closeCancelConfirmModal();
      },
      onClose: closeCancelConfirmModal,
    });
  };

  return {
    control,
    handleCancel,
    handleSubmit,
    isValid,
    detailAnswer,
    detailQuestion,
    isFormValid,
  };
};
