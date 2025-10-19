import { ModalContainer } from "@repo/ui/modal";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import "../styles/globals.css";

// Pretendard Variable을 next/font/local로 선언하여 자동 preload 및 FOIT 방지
const pretendard = localFont({
  src: [
    {
      path: "../fonts/PretendardVariable.woff2",
      weight: "45 920",
      style: "normal",
    },
  ],
  variable: "--font-family-pretendard",
  display: "swap",
});

export default function AdminApp({ Component, pageProps }: AppProps) {
  return (
    <div className={pretendard.variable}>
      <Component {...pageProps} />

      <ModalContainer />
    </div>
  );
}
