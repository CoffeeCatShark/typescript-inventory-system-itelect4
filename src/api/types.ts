import type {
    Item,
    Supplier,
    Manager,
    DeliveryBox
} from "../types/types";

// ============================================================
// ITEMS
// ============================================================

export type ItemResponse =
    Omit<Item, "itemID"> & {
        id: number;
    };

export type CreateItem =
    Omit<Item, "itemID">;


// ============================================================
// SUPPLIERS
// ============================================================

export type SupplierResponse =
    Omit<Supplier, "supplierId"> & {
        id: number;
    };

export type CreateSupplier =
    Omit<Supplier, "supplierId" | "deliveryBoxID">;


// ============================================================
// MANAGERS
// ============================================================

export type ManagerResponse =
    Omit<Manager, "managerID"> & {
        id: number;
    };

export type CreateManager =
    Omit<Manager, "managerID">;


// ============================================================
// DELIVERY BOXES
// ============================================================

export type DeliveryBoxResponse =
    Omit<DeliveryBox, "deliveryBoxID"> & {
        id: number;
    };

export type CreateDeliveryBox =
    Omit<DeliveryBox, "deliveryBoxID">;