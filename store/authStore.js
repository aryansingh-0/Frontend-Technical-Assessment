import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      username: null,
      email: null,
      firstName: null,
      lastName: null,
      gender: null,
      image: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (authData) =>
        set({
          username: authData.username,
          email: authData.email,
          firstName: authData.firstName,
          lastName: authData.lastName,
          gender: authData.gender,
          image: authData.image,
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          username: null,
          email: null,
          firstName: null,
          lastName: null,
          gender: null,
          image: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // key in localStorage
      getStorage: () => localStorage, // defaults to localStorage
    }
  )
);
