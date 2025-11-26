import { useEditQuoteMutation } from "@/api/quote/QuoteApi.mutation";
import {
  QUOTE_API_QUERY_KEY,
  useGetQuotesQuery,
} from "@/api/quote/QuoteApi.query";
import { usePageUrl } from "@repo/hooks";
import {
  SOLAR_INSTALLATION_TYPES,
  SolarInstallationType,
  SolarStructureType,
} from "@repo/types";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useCallback } from "react";

const PAGE_SIZE = 9;

export const useBidding = (structureType: SolarStructureType) => {
  const queryClient = useQueryClient();
  const { currentPage, handlePageChange } = usePageUrl();
  const router = useRouter();

  const installationTypeParam = router.query.installationType as
    | SolarInstallationType
    | undefined;
  const installationType = useMemo(() => {
    return installationTypeParam || SOLAR_INSTALLATION_TYPES.ROOF;
  }, [installationTypeParam]);

  const { data: quotesData } = useGetQuotesQuery({
    options: {
      enabled: !!currentPage,
    },
    variables: {
      structureType,
      installationType,
      page: currentPage,
      size: PAGE_SIZE,
    },
  });
  const { data: quotesPagination } = quotesData || {};
  const { data: quotesList, totalPages } = quotesPagination || {};

  // installationType 변경 함수
  const handleInstallationTypeChange = useCallback(
    (newInstallationType: SolarInstallationType) => {
      const { installationType: _, ...restQuery } = router.query;

      // roof가 기본값이므로, roof를 선택하면 쿼리 파라미터에서 제거
      if (newInstallationType === SOLAR_INSTALLATION_TYPES.ROOF) {
        router.push(
          {
            pathname: router.pathname,
            query: restQuery,
          },
          undefined,
          { shallow: true }
        );
      } else {
        // 다른 값이면 쿼리 파라미터에 추가
        router.push(
          {
            pathname: router.pathname,
            query: { ...restQuery, installationType: newInstallationType },
          },
          undefined,
          { shallow: true }
        );
      }
    },
    [router]
  );

  const { mutate: editQuote, isPending: isEditQuotePending } =
    useEditQuoteMutation({
      options: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: QUOTE_API_QUERY_KEY.GET_QUOTES({
              installationType,
              page: currentPage,
              size: PAGE_SIZE,
              structureType,
            }),
          });
        },
      },
    });

  return {
    installationType,
    handleInstallationTypeChange,
    currentPage,
    totalPages,
    handlePageChange,
    quotesList,
    editQuote,
    isEditQuotePending,
  };
};
