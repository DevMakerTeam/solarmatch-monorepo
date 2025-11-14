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
  _: NextApiResponse,
  tokens: { accessToken?: string; refreshToken?: string },
  options?: CookieOptions
): string[] => {
  const cookies: string[] = [];

  if (tokens.accessToken) {
    cookies.push(serializeCookie("accessToken", tokens.accessToken, options));
  }

  if (tokens.refreshToken) {
    cookies.push(serializeCookie("refreshToken", tokens.refreshToken, options));
  }

  return cookies;
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

  res.setHeader("Set-Cookie", [
    serializeCookie("accessToken", "", baseOptions),
    serializeCookie("refreshToken", "", baseOptions),
  ]);
};
