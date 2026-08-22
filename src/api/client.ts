import type {
    Item,
    Supplier,
    Manager,
    DeliveryBox
} from "../types/types";

import type {
    ItemResponse,
    CreateItem,
    SupplierResponse,
    CreateSupplier,
    ManagerResponse,
    CreateManager,
    DeliveryBoxResponse,
    CreateDeliveryBox
} from "./types";


const API_URL = "http://localhost:3001";


// ============================================================
// HELPER
// ============================================================

async function checkResponse(
    response: Response
): Promise<Response> {

    if (!response.ok) {
        throw new Error(
            `API Error: ${response.status}`
        );
    }

    return response;
}


// ============================================================
// ITEMS
// ============================================================

export async function getItems(): Promise<Item[]> {

    const response = await checkResponse(
        await fetch(`${API_URL}/items`)
    );

    const data: ItemResponse[] =
        await response.json();

    return data.map(item => ({
        itemID: item.id,
        itemName: item.itemName,
        supplierID: item.supplierID,
        supplierPrice: item.supplierPrice,
        itemType: item.itemType,
        deliveredQuantity:
            item.deliveredQuantity
    }));
}


export async function getItem(
    itemID: number
): Promise<Item> {

    const response = await checkResponse(
        await fetch(
            `${API_URL}/items/${itemID}`
        )
    );

    const item: ItemResponse =
        await response.json();

    return {
        itemID: item.id,
        itemName: item.itemName,
        supplierID: item.supplierID,
        supplierPrice: item.supplierPrice,
        itemType: item.itemType,
        deliveredQuantity:
            item.deliveredQuantity
    };
}


export async function createItem(
    item: CreateItem
): Promise<Item> {

    const response = await checkResponse(
        await fetch(`${API_URL}/items`, {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(item)
        })
    );

    const created: ItemResponse =
        await response.json();

    return {
        itemID: created.id,
        itemName: created.itemName,
        supplierID: created.supplierID,
        supplierPrice: created.supplierPrice,
        itemType: created.itemType,
        deliveredQuantity:
            created.deliveredQuantity
    };
}


export async function updateItem(
    item: Item
): Promise<Item> {

    const body: ItemResponse = {
        id: item.itemID,
        itemName: item.itemName,
        supplierID: item.supplierID,
        supplierPrice: item.supplierPrice,
        itemType: item.itemType,
        deliveredQuantity:
            item.deliveredQuantity
    };

    const response = await checkResponse(
        await fetch(
            `${API_URL}/items/${item.itemID}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(body)
            }
        )
    );

    const updated: ItemResponse =
        await response.json();

    return {
        itemID: updated.id,
        itemName: updated.itemName,
        supplierID: updated.supplierID,
        supplierPrice: updated.supplierPrice,
        itemType: updated.itemType,
        deliveredQuantity:
            updated.deliveredQuantity
    };
}


export async function deleteItem(
    itemID: number
): Promise<void> {

    await checkResponse(
        await fetch(
            `${API_URL}/items/${itemID}`,
            {
                method: "DELETE"
            }
        )
    );
}


// ============================================================
// SUPPLIERS
// ============================================================

export async function getSuppliers(): Promise<Supplier[]> {

    const response = await checkResponse(
        await fetch(`${API_URL}/suppliers`)
    );

    const data: SupplierResponse[] =
        await response.json();

    return data.map(supplier => ({
        supplierId: supplier.id,
        supplier_name:
            supplier.supplier_name,
        type: supplier.type,
        deliveryBoxID:
            supplier.deliveryBoxID
    }));
}


export async function getSupplier(
    supplierId: number
): Promise<Supplier> {

    const response = await checkResponse(
        await fetch(
            `${API_URL}/suppliers/${supplierId}`
        )
    );

    const supplier: SupplierResponse =
        await response.json();

    return {
        supplierId: supplier.id,
        supplier_name:
            supplier.supplier_name,
        type: supplier.type,
        deliveryBoxID:
            supplier.deliveryBoxID
    };
}


export async function createSupplier(
    supplier: CreateSupplier
): Promise<Supplier> {

    const response = await checkResponse(
        await fetch(`${API_URL}/suppliers`, {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(supplier)
        })
    );

    const created: SupplierResponse =
        await response.json();

    return {
        supplierId: created.id,
        supplier_name:
            created.supplier_name,
        type: created.type,
        deliveryBoxID:
            created.deliveryBoxID
    };
}


export async function updateSupplier(
    supplier: Supplier
): Promise<Supplier> {

    const body: SupplierResponse = {
        id: supplier.supplierId,
        supplier_name:
            supplier.supplier_name,
        type: supplier.type,
        deliveryBoxID:
            supplier.deliveryBoxID
    };

    const response = await checkResponse(
        await fetch(
            `${API_URL}/suppliers/${supplier.supplierId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(body)
            }
        )
    );

    const updated: SupplierResponse =
        await response.json();

    return {
        supplierId: updated.id,
        supplier_name:
            updated.supplier_name,
        type: updated.type,
        deliveryBoxID:
            updated.deliveryBoxID
    };
}


export async function deleteSupplier(
    supplierId: number
): Promise<void> {

    await checkResponse(
        await fetch(
            `${API_URL}/suppliers/${supplierId}`,
            {
                method: "DELETE"
            }
        )
    );
}


// ============================================================
// MANAGERS
// ============================================================

export async function getManagers(): Promise<Manager[]> {

    const response = await checkResponse(
        await fetch(`${API_URL}/managers`)
    );

    const data: ManagerResponse[] =
        await response.json();

    return data.map(manager => ({
        managerID: manager.id,
        managerName:
            manager.managerName,
        authLevel:
            manager.authLevel
    }));
}


export async function getManager(
    managerID: number
): Promise<Manager> {

    const response = await checkResponse(
        await fetch(
            `${API_URL}/managers/${managerID}`
        )
    );

    const manager: ManagerResponse =
        await response.json();

    return {
        managerID: manager.id,
        managerName:
            manager.managerName,
        authLevel:
            manager.authLevel
    };
}


export async function createManager(
    manager: CreateManager
): Promise<Manager> {

    const response = await checkResponse(
        await fetch(`${API_URL}/managers`, {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(manager)
        })
    );

    const created: ManagerResponse =
        await response.json();

    return {
        managerID: created.id,
        managerName:
            created.managerName,
        authLevel:
            created.authLevel
    };
}


export async function updateManager(
    manager: Manager
): Promise<Manager> {

    const body: ManagerResponse = {
        id: manager.managerID,
        managerName:
            manager.managerName,
        authLevel:
            manager.authLevel
    };

    const response = await checkResponse(
        await fetch(
            `${API_URL}/managers/${manager.managerID}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(body)
            }
        )
    );

    const updated: ManagerResponse =
        await response.json();

    return {
        managerID: updated.id,
        managerName:
            updated.managerName,
        authLevel:
            updated.authLevel
    };
}


export async function deleteManager(
    managerID: number
): Promise<void> {

    await checkResponse(
        await fetch(
            `${API_URL}/managers/${managerID}`,
            {
                method: "DELETE"
            }
        )
    );
}


// ============================================================
// DELIVERY BOXES
// ============================================================

export async function getDeliveryBoxes(): Promise<DeliveryBox[]> {

    const response = await checkResponse(
        await fetch(
            `${API_URL}/deliveryBoxes`
        )
    );

    const data: DeliveryBoxResponse[] =
        await response.json();

    return data.map(box => ({
        deliveryBoxID: box.id,
        ownerID: box.ownerID,
        itemsID: box.itemsID
    }));
}


export async function createDeliveryBox(
    box: CreateDeliveryBox
): Promise<DeliveryBox> {

    const response = await checkResponse(
        await fetch(
            `${API_URL}/deliveryBoxes`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(box)
            }
        )
    );

    const created: DeliveryBoxResponse =
        await response.json();

    return {
        deliveryBoxID: created.id,
        ownerID: created.ownerID,
        itemsID: created.itemsID
    };
}


export async function updateDeliveryBox(
    box: DeliveryBox
): Promise<DeliveryBox> {

    const body: DeliveryBoxResponse = {
        id: box.deliveryBoxID,
        ownerID: box.ownerID,
        itemsID: box.itemsID
    };

    const response = await checkResponse(
        await fetch(
            `${API_URL}/deliveryBoxes/${box.deliveryBoxID}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(body)
            }
        )
    );

    const updated: DeliveryBoxResponse =
        await response.json();

    return {
        deliveryBoxID: updated.id,
        ownerID: updated.ownerID,
        itemsID: updated.itemsID
    };
}