import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true, // Start as true to handle the initial Firebase check
  setUser: (user) => set({ user, isLoading: false }),
  clearUser: () => set({ user: null, isLoading: false }),
}));