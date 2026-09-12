import type {
    Item,
    Supplier,
    Manager,
    DeliveryBox
} from "../types/types";

// ============================================================
// Create
// ============================================================

export type CreateManager =
    Omit<Manager, "managerID">& {
    id?: string;
};

export type CreateSupplier =
    Omit<Supplier, "supplierId">& {
    id?: string;
};

export type CreateItem =
    Omit<Item, "itemID">& {
    id?: string;
};

export type CreateDeliveryBox =
    Omit<DeliveryBox, "deliveryBoxID">& {
    id?: string;
};

// ============================================================
// Update
// ============================================================

export type UpdateManager =
    Partial<Omit<Manager, "managerID">>;

export type UpdateSupplier =
    Partial<Omit<Supplier, "supplierId" | "deliveryBoxID">>;

export type UpdateItem =
    Partial<Omit<Item, "itemID">>;

export type UpdateDeliveryBox = 
    Partial<Omit<DeliveryBox, "deliveryBoxID">>


    //**
    // import type {
    //CreateManager,
    //CreateSupplier,
    //CreateItem,
    //CreateDeliveryBox,
    //UpdateManager,
    //UpdateSupplier,
    //UpdateItem,
    //UpdateDeliveryBox
    //} from './types';
    //
    // */