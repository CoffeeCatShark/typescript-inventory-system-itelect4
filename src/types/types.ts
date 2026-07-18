function updateGeneral<T>(items: T[], value:T ): void {
    items.push(value)
}
//^^^ should be in global

//*--------------------------------------------------------------ENUMS------------------------------------------------------------*
// */
export enum AuthorizationLvl {
    High = "High",
    Low = "Low",
    Pending = "Pending"
}

export enum SupplierType {
    Appliances = "Appliances",
    Furnitures = "Furnitures",
    Tools = "Tools"
}

/**
 *--------------------------------------------------------------INTERFACES------------------------------------------------------------*
 */
export interface Manager{
    managerID: number,
    name: String,
    authLevel: AuthorizationLvl
}

export interface Supplier{
    supplierId: number,
    supplier_name: String,
    type: SupplierType,
    deliveryBoxID: number
}

/**
 *--------------------------------------------------------------TYPES------------------------------------------------------------*
 */

export type DeliveryBox = {
    deliveryBoxID: number,
    ownerID: number
    itemsID: number[]
}


export type Storage = {
    itemID: number[]
}


export type Item = 
{
    itemID: number,
    itemName: string,
    supplierID: number
    supplierPrice: number,
    itemType: SupplierType,
    deliveredQuantity: number
}


    export var managers: Manager[] = []
    export var suppliers: Supplier[] = []
    export var deliveryBoxes: DeliveryBox[] = []
    export var items: Item[] = []
//----------------------------------------------------------------------------------------------------------------------------------------