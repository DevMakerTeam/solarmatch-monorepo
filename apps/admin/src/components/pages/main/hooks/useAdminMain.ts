import { useUsersStatsTodayRegistrationsQuery } from "@/api/users/UsersApi.query";

export const useAdminMain = () => {
  const { data: usersStatsTodayRegistrationsData } =
    useUsersStatsTodayRegistrationsQuery();
  const { data: usersStatsTodayRegistrations } =
    usersStatsTodayRegistrationsData || {};
  const { partner, total } = usersStatsTodayRegistrations || {};

  return {
    partner,
    total,
  };
};
