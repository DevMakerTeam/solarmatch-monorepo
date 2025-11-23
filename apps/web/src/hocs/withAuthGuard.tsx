import { ComponentProps, ComponentType, useEffect } from "react";

import { useRouter } from "next/router";
import { useLoginLink } from "@/components/Layout/root/hooks/useLoginLink";
import { useAuthStatus } from "@/hooks/useAuthStatus";

export default function withAuthGuard<T extends ComponentType<any>>(
  AppComponent: T
) {
  return function WrappedAppComponent(props: ComponentProps<T>) {
    const router = useRouter();
    const { loginLink } = useLoginLink();
    const { isLoggedIn } = useAuthStatus();

    useEffect(() => {
      if (isLoggedIn === false) router.replace(loginLink);
    }, [isLoggedIn, router]);

    return isLoggedIn ? <AppComponent {...props} /> : <></>;
  };
}
