import { UsersStatsBidsType } from "@/api/users/types/dto/users-stats-bids-dto";
import {
  useUsersStatsBidsQuery,
  useUsersStatsTodayRegistrationsQuery,
} from "@/api/users/UsersApi.query";
import { useState } from "react";
import dayjs from "dayjs";

export const useAdminMain = () => {
  // 오늘 가입 고객 통계 조회
  const {
    data: usersStatsTodayRegistrationsData,
    isLoading: isLoadingUsersStatsTodayRegistrations,
  } = useUsersStatsTodayRegistrationsQuery();
  const { data: usersStatsTodayRegistrations } =
    usersStatsTodayRegistrationsData || {};
  const { partner, total } = usersStatsTodayRegistrations || {};

  const [bidsType, setBidsType] = useState<UsersStatsBidsType>("DAILY");
  const handleChangeBidsType = (type: UsersStatsBidsType) => {
    setBidsType(type);
  };

  // 날짜 범위 상태
  const [startDate, setStartDate] = useState<string>(
    dayjs().subtract(30, "day").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState<string>(dayjs().format("YYYY-MM-DD"));

  // 입찰 건수 통계 조회
  const { data: usersStatsBidsData, isLoading: isLoadingUsersStatsBids } =
    useUsersStatsBidsQuery({
      variables: {
        type: bidsType,
        startDate,
        endDate,
      },
    });
  const { data: usersStatsBids } = usersStatsBidsData || {};
  const { data: chartData } = usersStatsBids || {};

  return {
    partner,
    total,
    bidsType,
    handleChangeBidsType,
    isLoadingUsersStatsTodayRegistrations,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    chartData,
    isLoadingUsersStatsBids,
  };
};
