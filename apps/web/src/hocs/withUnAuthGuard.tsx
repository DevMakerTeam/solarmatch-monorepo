import { ComponentProps, ComponentType, useEffect } from "react";

import { useRouter } from "next/router";
import { useAuthStatus } from "@/hooks/useAuthStatus";

export default function withUnAuthGuard<T extends ComponentType<any>>(
  AppComponent: T
) {
  return function WrappedAppComponent(props: ComponentProps<T>) {
    const router = useRouter();
    const { isLoggedIn } = useAuthStatus();

    useEffect(() => {
      if (isLoggedIn)
        router.replace(
          router.query?.returnUrl
            ? decodeURIComponent(router.query?.returnUrl as string)
            : "/"
        );
    }, [isLoggedIn, router]);

    return isLoggedIn === false ? <AppComponent {...props} /> : <></>;
  };
}
