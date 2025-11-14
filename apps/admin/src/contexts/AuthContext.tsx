import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type AuthState = {
  isLoggedIn: boolean;
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
};

const AuthContext = createContext<AuthContextValue | null>(null);

const areAuthStatesEqual = (a: AuthState, b: AuthState) => {
  return a.isLoggedIn === b.isLoggedIn;
};

export const AuthProvider = ({
  initialState = defaultAuthState,
  onAuthStateChange,
  children,
}: AuthProviderProps) => {
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
