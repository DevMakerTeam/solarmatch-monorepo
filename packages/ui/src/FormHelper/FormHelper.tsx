import { FormHelperProps } from "./types";

const FormHelper = ({ message, children }: FormHelperProps) => {
  const isShowErrorText = !!message?.error;

  return (
    <div className="flex flex-col gap-[8px] w-full">
      {children}

      {isShowErrorText && (
        <span className="text-cancel regular-caption">{message?.error}</span>
      )}
    </div>
  );
};

export default FormHelper;
