import LayoutFooter from "@/components/Layout/root/components/LayoutFooter";
import LayoutHeader from "@/components/Layout/root/components/LayoutHeader";
import { Spinner } from "@repo/ui/spinner";
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
  isLoading?: boolean;
}

export default function RootLayout({
  children,
  wrapperProps = {},
  mainProps = {},
  isPx = true,
  isLoading = false,
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
          isLoading && "flex items-center justify-center",
          mainStyles
        )}
        {...restMainProps}
      >
        {isLoading ? (
          <div className="flex items-center justify-center w-15 h-15 rounded-lg bg-primary my-auto">
            <Spinner size="lg" className="text-white" />
          </div>
        ) : (
          children
        )}
      </main>
      <LayoutFooter />
    </div>
  );
}
