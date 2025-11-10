import TestModal from "@/components/TestModal";
import { ModalContainer } from "@repo/ui/modal";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { useState } from "react";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  return (
    <div className={pretendard.variable}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />

        {/* 왼쪽 하단 테스트 모달 버튼 */}
        <button
          onClick={() => setIsTestModalOpen(true)}
          className="fixed bottom-6 left-6 z-[9998] bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-3 rounded-lg shadow-lg transition-all hover:scale-105"
          aria-label="테스트 모달 열기"
        >
          🧪 테스트
        </button>

        <TestModal
          isOpen={isTestModalOpen}
          onClose={() => setIsTestModalOpen(false)}
        />
        {/* 왼쪽 하단 테스트 모달 버튼 */}

        <ModalContainer />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}
