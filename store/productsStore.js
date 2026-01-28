import { create } from "zustand";
import axios from "axios";

export const useProductsStore = create((set, get) => ({
  productsCache: {}, // key: `${query}-${category}-${page}`
  total: 0,
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    const res = await axios.get("https://dummyjson.com/products/categories");
    set({ categories: res.data });
  },

  fetchProducts: async ({ limit = 10, skip = 0, query = "", category = "" }) => {
    const page = skip / limit;
    const key = `${query}-${category}-${page}`;
    if (get().productsCache[key]) return; // already cached

    set({ loading: true });
    try {
      let url = "";
      if (query) {
        url = `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`;
      } else if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
      } else {
        url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      }

      const res = await axios.get(url);
      set((state) => ({
        productsCache: { ...state.productsCache, [key]: res.data.products },
        total: res.data.total,
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));
