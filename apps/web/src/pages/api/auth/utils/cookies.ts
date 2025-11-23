import type { NextApiResponse } from "next";

type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
  path?: string;
  maxAge?: number;
};

const DEFAULT_OPTIONS: Required<
  Pick<CookieOptions, "httpOnly" | "secure" | "sameSite" | "path">
> = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export const serializeCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
) => {
  const finalValue = `${name}=${encodeURIComponent(value)}`;
  const segments = [
    finalValue,
    `Path=${options.path ?? DEFAULT_OPTIONS.path}`,
    (options.httpOnly ?? DEFAULT_OPTIONS.httpOnly) ? "HttpOnly" : undefined,
    (options.secure ?? DEFAULT_OPTIONS.secure) ? "Secure" : undefined,
    `SameSite=${options.sameSite ?? DEFAULT_OPTIONS.sameSite}`,
    options.maxAge ? `Max-Age=${options.maxAge}` : undefined,
  ].filter(Boolean);

  return segments.join("; ");
};

export const setAuthCookies = (
  res: NextApiResponse,
  tokens: { accessToken?: string; refreshToken?: string },
  options?: CookieOptions
) => {
  const cookies: string[] = [];

  if (tokens.accessToken) {
    cookies.push(serializeCookie("accessToken", tokens.accessToken, options));
  }

  if (tokens.refreshToken) {
    cookies.push(serializeCookie("refreshToken", tokens.refreshToken, options));
  }

  if (cookies.length > 0) {
    res.setHeader("Set-Cookie", cookies);
  }
};

export const clearAuthCookies = (
  res: NextApiResponse,
  options?: CookieOptions
) => {
  const baseOptions: CookieOptions = {
    httpOnly: options?.httpOnly ?? DEFAULT_OPTIONS.httpOnly,
    secure: options?.secure ?? DEFAULT_OPTIONS.secure,
    sameSite: options?.sameSite ?? DEFAULT_OPTIONS.sameSite,
    path: options?.path ?? DEFAULT_OPTIONS.path,
    maxAge: 0,
  };

  // 쿠키 삭제를 위해 expires를 과거 날짜로 설정
  const expiredDate = new Date(0).toUTCString();

  const deleteCookie = (name: string, opts: CookieOptions) => {
    const segments = [
      `${name}=`,
      `Path=${opts.path ?? DEFAULT_OPTIONS.path}`,
      `Expires=${expiredDate}`,
      `Max-Age=0`,
      (opts.httpOnly ?? DEFAULT_OPTIONS.httpOnly) ? "HttpOnly" : undefined,
      (opts.secure ?? DEFAULT_OPTIONS.secure) ? "Secure" : undefined,
      `SameSite=${opts.sameSite ?? DEFAULT_OPTIONS.sameSite}`,
    ].filter(Boolean);

    return segments.join("; ");
  };

  res.setHeader("Set-Cookie", [
    deleteCookie("accessToken", baseOptions),
    deleteCookie("refreshToken", baseOptions),
  ]);
};
