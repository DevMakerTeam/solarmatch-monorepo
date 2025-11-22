import type { Toast } from "@repo/hooks";

export type { Toast };

export interface ToastProps {
  toast: Toast;
  onClose: (id: string) => void;
}
