import { set } from "react-hook-form";
import { create } from "zustand";
import { Supplier, Manager } from "@/types/types";
import { persist } from "zustand/middleware";

type CurrentUserStore = {
    isAdmin: boolean
    userID: string | undefined
    isManager?: boolean 


    setPrivileges:(isAdmin:boolean) => void
    setUserID:(userID:string) => void
    setUserType:(isManager: boolean) => void
    
    logout: () => void;
}

export const useCurrentUser = create<CurrentUserStore>()(
    persist(
        (set) => ({
            isAdmin: false,
            isManager: false,
            userID: undefined,

            setUserID: (userID) => set({ userID }),

            setPrivileges: (isAdmin) => set({ isAdmin }),

            setUserType: (isManager) => set({ isManager }),

            logout: () => {
                set({
                    userID: undefined,
                    isAdmin: false,
                    isManager: false,
                });
            },
        }),
        {
            name: "current-user",
        }
    )
);