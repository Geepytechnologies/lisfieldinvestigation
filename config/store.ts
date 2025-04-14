// store/userStore.ts
import { IUserResponse } from "@/interfaces/responses/user.interface";
import { create } from "zustand";

type UserStore = {
  user: IUserResponse | null;
  setUser: (user: IUserResponse) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
