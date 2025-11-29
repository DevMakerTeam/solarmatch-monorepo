import { cn } from "@repo/utils";
import { PropsWithChildren } from "react";
import MobileHeader from "./components/MobileHeader";
import LayoutAside from "./components/LayoutAside";

const AdminRootLayout = ({
  children,
  className,
  mainWrapperClassName,
  childrenWrapperClassName,
  isLayoutPaddingY = true,
}: PropsWithChildren<{
  className?: string;
  mainWrapperClassName?: string;
  childrenWrapperClassName?: string;
  isLayoutPaddingY?: boolean;
}>) => {
  return (
    <div className={cn("relative w-full", className)}>
      {/* header */}
      <MobileHeader />

      {/* aside */}
      <LayoutAside />

      {/* main */}
      <main
        className={cn(
          "flex-1 pt-[64px] lg:pt-0 lg:pl-[260px] min-h-screen",
          mainWrapperClassName
        )}
      >
        <div
          className={cn(
            childrenWrapperClassName,
            isLayoutPaddingY && "layout-padding-y px-[16px] lg:px-[140px]"
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminRootLayout;
