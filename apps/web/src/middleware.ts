import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /api/* 경로만 처리 (auth 관련은 제외 - 쿠키 설정 등 복잡한 로직 필요)
  if (pathname.startsWith("/api/") && !pathname.startsWith("/api/auth/")) {
    if (!API_BASE_URL) {
      return NextResponse.json(
        {
          success: false,
          message: "API base URL is not configured.",
          data: null,
        },
        { status: 500 }
      );
    }

    // 쿠키에서 accessToken 읽기 (있으면 헤더에 추가, 없으면 그냥 프록시)
    const accessToken = request.cookies.get("accessToken")?.value;

    // 외부 API 경로로 변환 (경로 그대로 유지)
    const externalUrl = `${API_BASE_URL}${pathname}`;

    // 요청 본문 읽기
    const method = request.method;
    let body: string | undefined;

    if (method !== "GET" && method !== "HEAD") {
      try {
        body = await request.text();
      } catch (error) {
        console.error("Middleware proxy body error:", error);
        // 본문이 없는 경우 무시
      }
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // 토큰이 있으면 Authorization 헤더 추가
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    // 쿼리 파라미터 추가
    const searchParams = request.nextUrl.searchParams.toString();
    const urlWithQuery = searchParams
      ? `${externalUrl}?${searchParams}`
      : externalUrl;

    try {
      // 외부 API로 프록시 요청
      const response = await fetch(urlWithQuery, {
        method,
        headers,
        body,
      });

      const data = await response.json();

      return NextResponse.json(data, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Middleware proxy error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "서버 오류가 발생했습니다.",
          data: null,
        },
        { status: 500 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
