import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistStore {
  wishlist: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (product) =>
        set((state) => {
          const alreadyExists = state.wishlist.some(
            (item) => item.id === product.id
          );

          if (alreadyExists) {
            return state;
          }

          return {
            wishlist: [...state.wishlist, product],
          };
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter(
            (item) => item.id !== id
          ),
        })),

      isInWishlist: (id) =>
        get().wishlist.some((item) => item.id === id),
    }),
    {
      name: "shopsphere-wishlist",
    }
  )
);