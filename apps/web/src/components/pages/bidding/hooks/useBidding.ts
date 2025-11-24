import { useGetQuotesQuery } from "@/api/quote/QuoteApi.query";
import { SOLAR_INSTALLATION_TYPES } from "@/constants";
import { usePageUrl } from "@repo/hooks";
import { SolarInstallationType, SolarStructureType } from "@repo/types";
import { useRouter } from "next/router";
import { useMemo } from "react";

const PAGE_SIZE = 8;

export const useBidding = () => {
  const router = useRouter();
  const { currentPage, handlePageChange } = usePageUrl();

  // 경로에서 type 추출 (예: /bidding/residential-solar -> residential-solar)
  const type = useMemo(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    const pathSegments = pathWithoutQuery.split("/");
    const typeIndex = pathSegments.indexOf("bidding");
    return (
      typeIndex !== -1 && pathSegments[typeIndex + 1]
        ? pathSegments[typeIndex + 1]
        : ""
    ) as SolarStructureType;
  }, [router.asPath]);

  // install 쿼리스트링 처리 (없으면 첫 번째 값 사용)
  const install: SolarInstallationType = useMemo(() => {
    const installQuery = router.query.install as SolarInstallationType;
    return installQuery || SOLAR_INSTALLATION_TYPES[0].value;
  }, [router.query.install]);

  // myApplication 쿼리스트링 처리 (기본값: false)
  const myApplication = useMemo(() => {
    const myApplicationQuery = router.query.myApplication;
    return myApplicationQuery === "true";
  }, [router.query.myApplication]);

  const onChangeMobileType = (value: string) => {
    const params = new URLSearchParams();
    params.set("install", install);
    if (myApplication) {
      params.set("myApplication", "true");
    }
    router.push(`/bidding/${value}?${params.toString()}`);
  };

  const handleChangeInstallationType = (value: string) => {
    const params = new URLSearchParams();
    params.set("install", value);
    if (myApplication) {
      params.set("myApplication", "true");
    }
    router.push(`/bidding/${type}?${params.toString()}`);
  };

  const handleMyApplicationChange = (checked: boolean) => {
    const params = new URLSearchParams();
    params.set("install", install);
    if (checked) {
      params.set("myApplication", "true");
    }
    router.push(`/bidding/${type}?${params.toString()}`);
  };

  const { data } = useGetQuotesQuery({
    variables: {
      structureType: type,
      installationType: install,
      page: currentPage,
      size: PAGE_SIZE,
      myApplication: myApplication || undefined,
    },
  });
  const { data: quotesPagination } = data ?? {};
  const totalPages = quotesPagination?.totalPages ?? 0;
  const quotesList = quotesPagination?.data ?? [];

  return {
    currentPage,
    handlePageChange,
    type,
    install,
    myApplication,
    onChangeMobileType,
    handleChangeInstallationType,
    handleMyApplicationChange,
    quotesList,
    totalPages,
  };
};
