import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {

    user: string | null;

    isLoggedIn: boolean;

    login: (username: string) => void;

    logout: () => void;
}


export const useAuthStore =
    create<AuthStore>()(
        persist(

            (set) => ({

                user: null,

                isLoggedIn: false,


                login: (username) =>
                    set({
                        user: username,
                        isLoggedIn: true
                    }),


                logout: () =>
                    set({
                        user: null,
                        isLoggedIn: false
                    })

            }),

            {
                name: "auth-storage",

                partialize: state => ({
                    user: state.user,
                    isLoggedIn:
                        state.isLoggedIn
                })
            }

        )
    );