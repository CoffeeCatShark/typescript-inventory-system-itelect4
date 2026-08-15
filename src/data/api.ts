import { useDataStore } from "./store";

export async function getItems() {
    return useDataStore.getState().items;
}

export async function getSuppliers() {
    return useDataStore.getState().suppliers;
}

export async function getManagers() {
    return useDataStore.getState().managers;
}

export async function getStorage() {
    return useDataStore.getState().storage;
}

export async function getDeliveryBoxes() {
    return useDataStore.getState().deliveryBoxes;
}