import { create } from "zustand";
import axios from "axios";

export const useUsersStore = create((set, get) => ({
  users: {}, // store users by page+query key
  total: 0,
  loading: false,

  fetchUsers: async ({ limit = 10, skip = 0, query = "" }) => {
    const key = `${query}-${skip}`;
    if (get().users[key]) return; // already have data, skip fetch

    set({ loading: true });
    try {
      const url = query
        ? `https://dummyjson.com/users/search?q=${query}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
      const res = await axios.get(url);
      set((state) => ({
        users: { ...state.users, [key]: res.data.users },
        total: res.data.total,
        loading: false,
      }));
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
}));
