import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TestLoginState {
  isLoggedIn: boolean;
  userType: "partner" | "user" | null;
  login: (type: "partner" | "user") => void;
  logout: () => void;
}

export const useTestLoginStore = create<TestLoginState>()(
  persist(
    set => ({
      isLoggedIn: false,
      userType: null,
      login: type => set({ isLoggedIn: true, userType: type }),
      logout: () => set({ isLoggedIn: false, userType: null }),
    }),
    {
      name: "test-login-storage",
    }
  )
);
