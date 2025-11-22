import { create } from "zustand";

export interface Toast {
  id: string;
  message: string;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
  show: (message: string, duration?: number) => void;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastState>(set => ({
  toasts: [],
  show: (message: string, duration?: number) => {
    const id = `${Date.now()}-${Math.random()}`;
    const toast: Toast = {
      id,
      message,
      duration,
    };
    set(state => ({
      toasts: [...state.toasts, toast],
    }));
  },
  remove: (id: string) =>
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    })),
}));
