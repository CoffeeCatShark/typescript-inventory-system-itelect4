import { Manager, Supplier, DeliveryBox, Item, SupplierType, AuthorizationLvl, Storage } from "../types/types.ts"
import { managers, suppliers, items, deliveryBoxes, mainStorage} from "./database.ts"

export function getSupplierById(id: number): Supplier | undefined {
    return suppliers.find(s => s.supplierId === id);
}

export function getItemById(id: number): Item | undefined {
    return items.find(i => i.itemID === id);
}

export function getDeliveryBoxById(id: number): DeliveryBox | undefined {
    return deliveryBoxes.find(b => b.deliveryBoxID === id);
}

export function getManagersById(id: number): Manager | undefined {
    return managers.find(m => m.managerID === id )
}
                    //REDUNDANT
//=======================================================================================================================

export function add<T>(items: T[], value:T ): void {
    items.push(value)
}

export function remove<T, K extends keyof T>(
    array: T[],
    key: K,
    value: T[K]
): void {
    const index = array.findIndex(item => item[key] === value);

    if (index !== -1) {
        array.splice(index, 1);
    }
}


export function update<T, K extends keyof T>(
    array: T[],
    key: K,
    value: T
): boolean {
    const index = array.findIndex(item => item[key] === value[key]);

    if (index === -1) {
        return false;
    }

    array[index] = value;
    return true;
}

export function getById<T, K extends keyof T>(
    array: T[],
    key: K,
    value: T[K]
): T | undefined {
    return array.find(item => item[key] === value);
}

//**================================================== GUIDE
// Type = Type.(Manager, Supplier, etc.) 
// Key = Identifier(supplierID, managerID, etc.)
// Value = Key Value(ID = 5. value is 5.)
//
// add<T>(Type, value = key);
// getById<T>(Type, key, value = key);
// update<T>(Type, key, value = type);
// remove<T>(Type, key, value = key);

//  */
