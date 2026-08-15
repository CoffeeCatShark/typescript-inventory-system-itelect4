import { create } from "zustand";
import {
    Item,
    Supplier,
    Manager,
    Storage,
    DeliveryBox
} from "../types/types";

import {
    items,
    suppliers,
    managers,
    mainStorage,
    deliveryBoxes
} from "./database";


interface DataStore {

    // ====================
    // DATA
    // ====================

    items: Item[];
    suppliers: Supplier[];
    managers: Manager[];
    storage: Storage;
    deliveryBoxes: DeliveryBox[];


    // ====================
    // ITEM API
    // ====================

    addItem: (item: Item) => void;
    updateItem: (item: Item) => void;
    removeItem: (itemID: number) => void;


    // ====================
    // SUPPLIER API
    // ====================

    addSupplier: (supplier: Supplier) => void;
    updateSupplier: (supplier: Supplier) => void;
    removeSupplier: (supplierID: number) => void;


    // ====================
    // MANAGER API
    // ====================

    addManager: (manager: Manager) => void;
    updateManager: (manager: Manager) => void;
    removeManager: (managerID: number) => void;


    // ====================
    // STORAGE API
    // ====================

    addToStorage: (itemID: number) => void;
    removeFromStorage: (itemID: number) => void;


    // ====================
    // DELIVERY BOX API
    // ====================

    addDeliveryBox: (box: DeliveryBox) => void;
    updateDeliveryBox: (box: DeliveryBox) => void;
    removeDeliveryBox: (deliveryBoxID: number) => void;

    addItemToDeliveryBox: (
        deliveryBoxID: number,
        itemID: number
    ) => void;

    removeItemFromDeliveryBox: (
        deliveryBoxID: number,
        itemID: number
    ) => void;
}


export const useDataStore = create<DataStore>((set) => ({

    // ====================
    // INITIAL DATA
    // ====================

    items: [...items],

    suppliers: [...suppliers],

    managers: [...managers],

    storage: {
        ...mainStorage,
        itemID: [...mainStorage.itemID]
    },

    deliveryBoxes: [...deliveryBoxes],


    // ====================
    // ITEMS
    // ====================

    addItem: (item) =>
        set(state => ({
            items: [
                ...state.items,
                item
            ]
        })),


    updateItem: (updatedItem) =>
        set(state => ({
            items: state.items.map(item =>
                item.itemID === updatedItem.itemID
                    ? updatedItem
                    : item
            )
        })),


    removeItem: (itemID) =>
        set(state => ({
            items: state.items.filter(
                item => item.itemID !== itemID
            )
        })),


    // ====================
    // SUPPLIERS
    // ====================

    addSupplier: (supplier) =>
        set(state => ({
            suppliers: [
                ...state.suppliers,
                supplier
            ]
        })),


    updateSupplier: (updatedSupplier) =>
        set(state => ({
            suppliers: state.suppliers.map(supplier =>
                supplier.supplierId === updatedSupplier.supplierId
                    ? updatedSupplier
                    : supplier
            )
        })),


    removeSupplier: (supplierID) =>
        set(state => ({
            suppliers: state.suppliers.filter(
                supplier =>
                    supplier.supplierId !== supplierID
            )
        })),


    // ====================
    // MANAGERS
    // ====================

    addManager: (manager) =>
        set(state => ({
            managers: [
                ...state.managers,
                manager
            ]
        })),


    updateManager: (updatedManager) =>
        set(state => ({
            managers: state.managers.map(manager =>
                manager.managerID === updatedManager.managerID
                    ? updatedManager
                    : manager
            )
        })),


    removeManager: (managerID) =>
        set(state => ({
            managers: state.managers.filter(
                manager =>
                    manager.managerID !== managerID
            )
        })),


    // ====================
    // STORAGE
    // ====================

    addToStorage: (itemID) =>
        set(state => ({
            storage: {
                ...state.storage,

                itemID: [
                    ...state.storage.itemID,
                    itemID
                ]
            }
        })),


    removeFromStorage: (itemID) =>
        set(state => ({
            storage: {
                ...state.storage,

                itemID: state.storage.itemID.filter(
                    id => id !== itemID
                )
            }
        })),


    // ====================
    // DELIVERY BOXES
    // ====================

    addDeliveryBox: (box) =>
        set(state => ({
            deliveryBoxes: [
                ...state.deliveryBoxes,
                box
            ]
        })),


    updateDeliveryBox: (updatedBox) =>
        set(state => ({
            deliveryBoxes: state.deliveryBoxes.map(box =>
                box.deliveryBoxID === updatedBox.deliveryBoxID
                    ? updatedBox
                    : box
            )
        })),


    removeDeliveryBox: (deliveryBoxID) =>
        set(state => ({
            deliveryBoxes: state.deliveryBoxes.filter(
                box =>
                    box.deliveryBoxID !== deliveryBoxID
            )
        })),


    // ====================
    // DELIVERY BOX ITEMS
    // ====================

    addItemToDeliveryBox: (deliveryBoxID, itemID) =>
        set(state => ({
            deliveryBoxes: state.deliveryBoxes.map(box => {

                if (
                    box.deliveryBoxID !== deliveryBoxID
                ) {
                    return box;
                }

                return {
                    ...box,

                    itemsID: [
                        ...box.itemsID,
                        itemID
                    ]
                };
            })
        })),


    removeItemFromDeliveryBox: (
        deliveryBoxID,
        itemID
    ) =>
        set(state => ({
            deliveryBoxes: state.deliveryBoxes.map(box => {

                if (
                    box.deliveryBoxID !== deliveryBoxID
                ) {
                    return box;
                }

                return {
                    ...box,

                    itemsID: box.itemsID.filter(
                        id => id !== itemID
                    )
                };
            })
        }))
}));