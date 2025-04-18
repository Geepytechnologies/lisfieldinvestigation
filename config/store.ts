// store/userStore.ts
import { create } from "zustand";
import { IUserResponse } from "@/interfaces/responses/user.interface";

type UserStore = {
  user: IUserResponse | null;
  setUser: (user: IUserResponse) => void;
  clearUser: () => void;
  isAuthenticated: boolean | null;
  setAuthStatus: (status: boolean | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: null,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
  setAuthStatus: (status) => set({ isAuthenticated: status }),
}));
