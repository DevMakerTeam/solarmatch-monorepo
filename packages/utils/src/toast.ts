import { useToastStore } from "@repo/hooks";

/**
 * 전역 toast 함수
 * 브라우저 환경에서만 동작하며, useToastStore를 직접 사용합니다.
 */
export const toast = (message: string, duration?: number) => {
  if (typeof window === "undefined") {
    return;
  }

  const store = useToastStore.getState();
  store.show(message, duration);
};

export const toastError = (message: string, duration?: number) => {
  toast(message, duration);
};
