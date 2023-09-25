import { create } from "zustand";
import { Product } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";
import { get } from "http";
import toast from "react-hot-toast";

interface CartStore {
    items: Product[];
    addItem: (data: Product) => void;
    removeItem: (id: String) => void;
    clearCart: () => void;
};

const useCart = create(
    persist<CartStore>((set, get) => ({
        items: [],
        addItem: (data: Product) => {
            const currentItems = get().items;
            const existingItem = currentItems.find((item) => item.id === data.id);

            if (existingItem) {
                return toast.success("Produto já está no carrinho!");
            }

            set({ items: [...get().items, data] });
            toast.success("Produto adicionado ao carrinho!");
        },
        removeItem: (id: String) => {
            set({ items: get().items.filter((item) => item.id !== id) });
            toast.success("Produto removido do carrinho!");
        },
        clearCart: () => set({ items: [] }),
    }), {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
    })
);


// const test = create(
//     persist((set, get) => ({
//     }), {
//         name: "cart-storage",
//         getStorage: () => sessionStorage,
//     })
// );

export default useCart;