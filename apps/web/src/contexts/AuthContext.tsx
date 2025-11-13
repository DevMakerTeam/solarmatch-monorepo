import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { MeModel } from "@/api/auth/types/model/me-model";

export type AuthState = {
  isLoggedIn: boolean;
  user: MeModel["data"] | null;
  userName: string | null;
};

export type AuthContextValue = AuthState & {
  setAuthState: (payload: AuthState) => void;
  clearAuthState: () => void;
};

type AuthProviderProps = {
  initialState?: AuthState;
  onAuthStateChange?: (state: AuthState) => void;
  children: ReactNode;
};

export const defaultAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
  userName: null,
};

const AuthContext = createContext<AuthContextValue | null>(null);

const areAuthStatesEqual = (a: AuthState, b: AuthState) => {
  if (a.isLoggedIn !== b.isLoggedIn) {
    return false;
  }

  if (a.userName !== b.userName) {
    return false;
  }

  if (a.user === b.user) {
    return true;
  }

  if (!a.user || !b.user) {
    return false;
  }

  return a.user.id === b.user.id;
};

export const AuthProvider = ({
  initialState = defaultAuthState,
  onAuthStateChange,
  children,
}: AuthProviderProps) => {
  // initialState는 최초 마운트 시에만 사용 (useState로 초기화)
  const [authState, internalSetAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    onAuthStateChange?.(authState);
  }, [authState, onAuthStateChange]);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...authState,
      setAuthState: payload => {
        internalSetAuthState(prevState =>
          areAuthStatesEqual(prevState, payload) ? prevState : payload
        );
      },
      clearAuthState: () => {
        internalSetAuthState(prevState =>
          areAuthStatesEqual(prevState, defaultAuthState)
            ? prevState
            : defaultAuthState
        );
      },
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth 훅은 AuthProvider 내부에서만 사용할 수 있습니다.");
  }

  return context;
};
