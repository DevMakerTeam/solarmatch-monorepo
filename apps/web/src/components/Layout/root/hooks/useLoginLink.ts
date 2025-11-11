import { useRouter } from "next/router";
import { useMemo } from "react";

export const useLoginLink = () => {
  const router = useRouter();

  const { returnUrl } = router.query;
  const { isReady } = router;

  const loginLink = useMemo(() => {
    if (returnUrl) {
      return `/login?returnUrl=${encodeURIComponent(returnUrl as string)}`;
    }
    return `/login${router.asPath !== "/" ? `?returnUrl=${encodeURIComponent(router.asPath)}` : ""}`;
  }, [returnUrl, router.asPath]);

  return { loginLink, isReady };
};
