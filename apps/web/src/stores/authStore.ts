import type { MeModel } from "@/api/auth/types/model/me-model";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  user: MeModel["data"] | null;
  setAuthState: (payload: {
    isLoggedIn: boolean;
    user: MeModel["data"] | null;
  }) => void;
  clearAuthState: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: false,
  user: null,
  setAuthState: ({ isLoggedIn, user }) => set({ isLoggedIn, user }),
  clearAuthState: () => set({ isLoggedIn: false, user: null }),
}));
