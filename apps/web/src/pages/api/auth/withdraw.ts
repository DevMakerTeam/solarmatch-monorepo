import type { NextApiRequest, NextApiResponse } from "next";
import type { WithdrawModel } from "@/api/auth/types/model/withdraw-model";
import { clearAuthCookies } from "./utils/cookies";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const handleDelete = async (
  req: NextApiRequest,
  res: NextApiResponse<WithdrawModel>
) => {
  if (!API_BASE_URL) {
    return res.status(500).json({
      success: false,
      message: "API base URL is not configured.",
      data: {},
    });
  }

  const { accessToken } = req.cookies ?? {};
  const cookieHeader = req.headers.cookie ?? "";

  try {
    const backendResponse = await fetch(`${API_BASE_URL}/api/auth/withdraw`, {
      method: "DELETE",
      headers: {
        Cookie: cookieHeader,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });

    const responseBody = (await backendResponse.json()) as WithdrawModel;

    // 성공 시에만 쿠키 클리어
    if (responseBody.success) {
      clearAuthCookies(res);
    }

    return res.status(backendResponse.status).json(responseBody);
  } catch (error) {
    console.error("Failed to withdraw:", error);

    return res.status(500).json({
      success: false,
      message: "회원탈퇴 처리 중 오류가 발생했습니다.",
      data: {},
    });
  }
};

const withdrawHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<WithdrawModel>
) => {
  if (req.method !== "DELETE") {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({
      success: false,
      message: "허용되지 않은 요청입니다.",
      data: {},
    });
  }

  return handleDelete(req, res);
};

export default withdrawHandler;
