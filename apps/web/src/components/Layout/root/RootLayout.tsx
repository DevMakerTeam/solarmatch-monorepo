import LayoutFooter from "@/components/Layout/root/components/LayoutFooter";
import LayoutHeader from "@/components/Layout/root/components/LayoutHeader";
import { cn } from "@repo/utils";
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";

type OmitWrapper<T> = Omit<T, "children">;
type HTMLProps<T extends HTMLElement> = OmitWrapper<
  DetailedHTMLProps<HTMLAttributes<T>, T>
>;

interface RootLayoutProps {
  wrapperProps?: HTMLProps<HTMLDivElement>;
  mainProps?: HTMLProps<HTMLElement>;
  isPx?: boolean;
}

export default function RootLayout({
  children,
  wrapperProps = {},
  mainProps = {},
  isPx = true,
}: PropsWithChildren<RootLayoutProps>) {
  const { className: wrapperStyles, ...restWrapperProps } = wrapperProps;
  const { className: mainStyles, ...restMainProps } = mainProps;

  return (
    <div
      className={cn("relative min-h-screen flex flex-col", wrapperStyles)}
      {...restWrapperProps}
    >
      <LayoutHeader />
      <main
        className={cn(
          "flex-1 pt-[64px] lg:pt-[80px] max-w-[1150px] w-full mx-auto",
          isPx && "px-[30px] xl:px-0",
          mainStyles
        )}
        {...restMainProps}
      >
        {children}
      </main>
      <LayoutFooter />
    </div>
  );
}
