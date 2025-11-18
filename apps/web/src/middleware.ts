import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

    const accessToken = request.cookies.get("accessToken")?.value;
    const externalUrl = `${API_BASE_URL}${pathname}`;

    const method = request.method;

    // 원본 헤더 복사 후 불필요한 헤더는 제거
    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("content-length");
    // content-type은 유지해야 multipart/form-data의 boundary가 보존됨

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    const searchParams = request.nextUrl.searchParams.toString();
    const urlWithQuery = searchParams
      ? `${externalUrl}?${searchParams}`
      : externalUrl;

    // GET/HEAD는 body 없음, 그 외는 원본 스트림 전달
    const init: RequestInit = {
      method,
      headers,
      body:
        method === "GET" || method === "HEAD"
          ? undefined
          : (request.body as ReadableStream | undefined),
    };

    try {
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
        { success: false, message: "서버 오류가 발생했습니다.", data: null },
        { status: 500 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
