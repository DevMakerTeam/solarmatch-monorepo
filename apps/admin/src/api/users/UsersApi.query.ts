import { isNotNullish, Parameter, UseQueryParams } from "@repo/types";
import usersApi from "./UsersApi";
import { useQuery } from "@tanstack/react-query";

export const USERS_API_QUERY_KEY = {
  GET_USERS: (params?: Parameter<typeof usersApi.getUsers>) =>
    ["get-users", params].filter(isNotNullish),
  GET_USER_DETAIL: (params?: Parameter<typeof usersApi.getUserDetail>) =>
    ["get-user-detail", params].filter(isNotNullish),
};

// 회원 목록 조회
export const useGetUsersQuery = (
  params: UseQueryParams<typeof usersApi.getUsers>
) => {
  const queryKey = USERS_API_QUERY_KEY.GET_USERS(params?.variables);
  return useQuery({
    queryKey,
    queryFn: () => usersApi.getUsers(params.variables),
    ...params?.options,
  });
};

// 회원 상세 조회
export const useGetUserDetailQuery = (
  params: UseQueryParams<typeof usersApi.getUserDetail>
) => {
  const queryKey = USERS_API_QUERY_KEY.GET_USER_DETAIL(params.variables);
  return useQuery({
    queryKey,
    queryFn: () => usersApi.getUserDetail(params.variables),
    ...params?.options,
  });
};
