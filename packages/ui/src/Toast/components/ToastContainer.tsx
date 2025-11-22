import { useToastStore } from "@repo/hooks";
import Toast from "../Toast";

function ToastContainer() {
  const toasts = useToastStore(state => state.toasts);
  const remove = useToastStore(state => state.remove);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-[64px] lg:top-[80px] left-1/2 -translate-x-1/2 z-80 flex flex-col gap-[12px] items-center">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={remove} />
      ))}
    </div>
  );
}

export default ToastContainer;
