import { useToastStore } from "./useToastStore";

export const useToast = () => {
  const show = useToastStore(state => state.show);

  return {
    toast: (message: string, duration?: number) => {
      show(message, duration);
    },
  };
};
