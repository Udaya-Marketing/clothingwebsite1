import { create } from "zustand";

type CartLine = { productId: string; size: string; quantity: number };

type CartState = {
  items: CartLine[];
  isOpen: boolean;
  addItem: (productId: string, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  setOpen: (isOpen: boolean) => void;
  toggleItem: (productId: string) => void;
  wishlist: string[];
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  wishlist: [],
  addItem: (productId, size) =>
    set((state) => {
      const current = state.items.find((item) => item.productId === productId && item.size === size);
      return {
        items: current
          ? state.items.map((item) =>
              item.productId === productId && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...state.items, { productId, size, quantity: 1 }],
        isOpen: true,
      };
    }),
  removeItem: (productId, size) =>
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId || item.size !== size),
    })),
  setOpen: (isOpen) => set({ isOpen }),
  toggleItem: (productId) =>
    set((state) => ({
      wishlist: state.wishlist.includes(productId)
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId],
    })),
}));
