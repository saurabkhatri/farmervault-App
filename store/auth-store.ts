import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setUser: (user: any) => set({ user }),
      setToken: (token: any) => set({ token }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
