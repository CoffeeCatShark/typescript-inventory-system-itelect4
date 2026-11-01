import { create } from "zustand";

interface UIStore {
    isSidebarOpen: boolean;
    selectedItemID: string;

    toggleSidebar: () => void;
    openSidebar: () => void;
    closeSidebar: () => void;

    selectItem: (itemID: string) => void;
    clearSelectedItem: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
    isSidebarOpen: false,
    selectedItemID: "",

    toggleSidebar: () =>
        set((state) => ({
            isSidebarOpen: !state.isSidebarOpen
        })),

    openSidebar: () =>
        set({
            isSidebarOpen: true
        }),

    closeSidebar: () =>
        set({
            isSidebarOpen: false
        }),

    selectItem: (itemID) =>
        set({
            selectedItemID: itemID
        }),

    clearSelectedItem: () =>
        set({
            selectedItemID: ""
        })
}));