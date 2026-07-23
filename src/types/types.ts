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
    managerName: String,
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
    itemsID?: number[]
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


    export var globalID = 10

    export function incrementID() {
    globalID++
    }export default incrementID


//----------------------------------------------------------------------------------------------------------------------------------------