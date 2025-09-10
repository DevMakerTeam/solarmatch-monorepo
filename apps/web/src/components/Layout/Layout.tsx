import Footer from "@/components/Footer";
import { LayoutHeader } from "@/components/Layout/components";
import { cn } from "@repo/utils";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";

type OmitWrapper<T> = Omit<T, "children">;
type HTMLProps<T extends HTMLElement> = OmitWrapper<
  DetailedHTMLProps<HTMLAttributes<T>, T>
>;

interface LayoutProps {
  wrapperProps?: HTMLProps<HTMLDivElement>;
  mainProps?: HTMLProps<HTMLElement>;
  footer?: ReactNode;
  isPx?: boolean;
}

export default function Layout({
  children,
  footer = <Footer />,
  wrapperProps = {},
  mainProps = {},
  isPx = true,
}: PropsWithChildren<LayoutProps>) {
  const { className: wrapperStyles, ...restWrapperProps } = wrapperProps;
  const { className: mainStyles, ...restMainProps } = mainProps;

  return (
    <div className={cn("relative", wrapperStyles)} {...restWrapperProps}>
      <LayoutHeader />
      <main
        className={cn(
          "pt-[64px] lg:pt-[80px] max-w-[1150px] mx-auto",
          isPx && "px-[30px] xl:px-0",
          mainStyles
        )}
        {...restMainProps}
      >
        {children}
      </main>
      {footer}
    </div>
  );
}
