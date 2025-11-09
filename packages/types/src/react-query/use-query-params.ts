import { AxiosError } from "axios";

import { UseQueryOptions } from "@tanstack/react-query";

import { WrapVariables } from "./wrap-variables";
import { AsyncFn, AsyncFnReturn, Parameter } from "../utility";

// Example : const useAnyQuery = ({ options, variables } : UseQueryParams<typeof anyApiFn>) => {...}
export type UseQueryParams<
  T extends AsyncFn,
  Error = AxiosError<any>,
  Data = AsyncFnReturn<T>,
  Variables = Parameter<T>,
> = {
  options?: Omit<UseQueryOptions<Data, Error>, "queryKey" | "queryFn">;
} & WrapVariables<Variables>;
