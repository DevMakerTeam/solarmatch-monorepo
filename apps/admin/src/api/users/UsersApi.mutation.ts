import { UseMutationParams } from "@repo/types";
import usersApi from "./UsersApi";
import { useMutation } from "@tanstack/react-query";

// 회원 정보 수정
export const useEditUserMutation = (
  params?: UseMutationParams<typeof usersApi.editUser>
) => {
  return useMutation({
    mutationFn: usersApi.editUser,
    ...params?.options,
  });
};

// 회원 탈퇴 처리
export const useDeleteUserMutation = (
  params?: UseMutationParams<typeof usersApi.deleteUser>
) => {
  return useMutation({
    mutationFn: usersApi.deleteUser,
    ...params?.options,
  });
};
