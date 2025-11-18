import { isNotNullish, Parameter, UseQueryParams } from "@repo/types";
import partnerApi from "./PartnerApi";
import { useQuery } from "@tanstack/react-query";

const PARTNER_API_QUERY_KEY = {
  MY_APPLICATION: (params?: Parameter<typeof partnerApi.myApplication>) =>
    ["partner-my-application", params].filter(isNotNullish),
};

// 내 파트너 신청 조회
export const useMyApplicationQuery = (
  params?: UseQueryParams<typeof partnerApi.myApplication>
) => {
  return useQuery({
    queryKey: PARTNER_API_QUERY_KEY.MY_APPLICATION(params),
    queryFn: partnerApi.myApplication,
    ...params?.options,
  });
};
