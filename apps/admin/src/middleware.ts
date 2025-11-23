import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /api/admin/* 경로만 처리 (auth 관련은 제외)
  const isAdminApi =
    pathname.startsWith("/api/admin/") &&
    !pathname.startsWith("/api/admin/auth/");

  // /api/image/* 경로 처리 (auth 관련은 제외)
  const isImageApi =
    pathname.startsWith("/api/image/") && !pathname.startsWith("/api/auth/");

  if (isAdminApi || isImageApi) {
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

    // 쿠키에서 accessToken 읽기
    const accessToken = request.cookies.get("accessToken")?.value;

    // /api/admin/* 경로는 accessToken 필수, /api/image/* 경로는 선택적
    if (isAdminApi && !accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: "인증이 필요합니다.",
          data: null,
        },
        { status: 401 }
      );
    }

    // 외부 API 경로로 변환 (경로 그대로 유지)
    const externalUrl = `${API_BASE_URL}${pathname}`;

    // 원본 메서드
    const method = request.method;

    // 원본 헤더 복사 후 불필요한 헤더는 제거
    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("content-length");
    // content-type은 유지해야 multipart/form-data의 boundary가 보존됨

    // Authorization 헤더 설정 (accessToken이 있는 경우에만)
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    // 쿼리 파라미터 추가
    const searchParams = request.nextUrl.searchParams.toString();
    const urlWithQuery = searchParams
      ? `${externalUrl}?${searchParams}`
      : externalUrl;

    try {
      // GET/HEAD는 body 없음, 그 외는 원본 스트림 전달
      const init: RequestInit = {
        method,
        headers,
        body:
          method === "GET" || method === "HEAD"
            ? undefined
            : (request.body as ReadableStream | undefined),
      };

      const response = await fetch(urlWithQuery, init);

      // 응답을 그대로 스트리밍 전달
      const resHeaders = new Headers(response.headers);
      return new NextResponse(response.body, {
        status: response.status,
        headers: resHeaders,
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
  matcher: ["/api/admin/:path*", "/api/image/:path*"],
};
