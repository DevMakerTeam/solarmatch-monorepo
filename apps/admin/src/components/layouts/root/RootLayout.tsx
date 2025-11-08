import { cn } from "@repo/utils";
import { PropsWithChildren } from "react";
import MobileHeader from "./components/MobileHeader";
import LayoutAside from "./components/LayoutAside";

const AdminRootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={cn("relative w-full")}>
      {/* header */}
      <MobileHeader />

      {/* aside */}
      <LayoutAside />

      {/* main */}
      <main
        className={cn("flex-1 pt-[64px] lg:pt-0 lg:pl-[260px] min-h-screen")}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminRootLayout;
