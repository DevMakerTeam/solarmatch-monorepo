import { isNotNullish, Parameter, UseQueryParams } from "@repo/types";
import authApi from "./AuthApi";
import { useQuery } from "@tanstack/react-query";

export const AUTH_API_QUERY_KEY = {
  ME: (params?: Parameter<typeof authApi.me>) =>
    ["me", params].filter(isNotNullish),
};

// 내 정보 조회
export const useMeQuery = (params?: UseQueryParams<typeof authApi.me>) => {
  const queryKey = AUTH_API_QUERY_KEY.ME(params?.variables);
  return useQuery({
    queryKey,
    queryFn: authApi.me,
    ...params?.options,
  });
};
