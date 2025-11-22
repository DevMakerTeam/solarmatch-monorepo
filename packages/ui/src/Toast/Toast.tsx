import { cn } from "@repo/utils";
import { useEffect } from "react";
import { ToastProps } from "./types";

const Toast = ({ toast, onClose }: ToastProps) => {
  const { id, message, duration = 3000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div
      className={cn(
        "flex items-center px-[22px] py-[10px] rounded-[30px] bg-black/50 animate-in slide-in-from-top-2 fade-in-0 w-fit"
      )}
    >
      <p className="medium-body text-white text-nowrap">{message}</p>
    </div>
  );
};

export default Toast;
