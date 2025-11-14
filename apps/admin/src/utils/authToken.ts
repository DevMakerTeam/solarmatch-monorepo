import jwt, { JwtPayload } from "jsonwebtoken";

export const decodeJwt = (
  token?: string
): (JwtPayload & { exp?: number; iat?: number }) | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded === "string") {
      return null;
    }

    return decoded as JwtPayload & { exp?: number; iat?: number };
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

export const isTokenExpired = (token?: string, skewSeconds = 0) => {
  const payload = decodeJwt(token);

  if (!payload?.exp) {
    return false;
  }

  const current = Math.floor(Date.now() / 1000);

  return payload.exp <= current + skewSeconds;
};

export const getAccessToken = () => {
  if (typeof document === "undefined") {
    return undefined;
  }

  const match = document.cookie.match(/(?:^|; )accessToken=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : undefined;
};
