import type {
    Item,
    Supplier,
    Manager,
    DeliveryBox
} from "../types/types";

// ============================================================
// CREATE
// ============================================================

export type CreateManager = Omit<Manager, "id">;

export type CreateSupplier = Omit<Supplier, "id">;

export type CreateItem = Omit<Item, "id">;

export type CreateDeliveryBox = Omit<DeliveryBox, "id">;

// ============================================================
// UPDATE
// ============================================================

export type UpdateManager = Partial<Omit<Manager, "id">>;

export type UpdateSupplier = Partial<Omit<Supplier, "id">>;

export type UpdateItem = Partial<Omit<Item, "id">>;

export type UpdateDeliveryBox = Partial<Omit<DeliveryBox, "id">>;