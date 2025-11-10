import { PropsWithChildren } from "react";

interface Props {
  message?: {
    error?: string;
  };
}

export type FormHelperProps = PropsWithChildren<Props>;
