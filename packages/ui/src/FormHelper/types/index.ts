import { PropsWithChildren } from "react";

interface Props {
  message?: {
    error?: string;
  };
  className?: string;
}

export type FormHelperProps = PropsWithChildren<Props>;
