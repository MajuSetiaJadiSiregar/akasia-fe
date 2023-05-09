import { wishList } from "model/whistlist";
import { create } from "zustand";

interface WishListState {
    wishlists : wishList[];
    addWishList : (name:string, climate : string, createdDate : string, population : string) => void;
}

export const useStoreWishList = create<WishListState>((set) => ({
    wishlists : [],
    addWishList : (name:string, climate : string, createdDate : string, population : string) => {
        set((state) => ({
            wishlists: [
                ...state.wishlists,{name, climate, createdDate, population} as wishList
            ]
        }))
    }
}))