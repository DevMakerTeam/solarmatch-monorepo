import { useTestLoginStore } from "@/stores/testLoginStore";
import { Button } from "@repo/ui/button";

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TestModal({ isOpen, onClose }: TestModalProps) {
  const { isLoggedIn, userType, login, logout } = useTestLoginStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">테스트 모달</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* 현재 상태 표시 */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold mb-2">현재 상태:</p>
            {isLoggedIn ? (
              <div className="text-sm">
                <p className="text-green-600">로그인됨</p>
                <p className="text-gray-600">
                  유형:{" "}
                  <span className="font-semibold">
                    {userType === "partner" ? "파트너" : "유저"}
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-sm text-red-600">로그아웃 상태</p>
            )}
          </div>

          {/* 로그인/로그아웃 버튼 */}
          {!isLoggedIn ? (
            <div className="space-y-3">
              <p className="text-sm font-semibold">로그인:</p>
              <Button
                onClick={() => login("partner")}
                className="w-full"
                variant="solid"
              >
                파트너로 로그인
              </Button>
              <Button
                onClick={() => login("user")}
                className="w-full"
                variant="solid"
              >
                유저로 로그인
              </Button>
            </div>
          ) : (
            <Button onClick={logout} className="w-full" variant="cancel">
              로그아웃
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
