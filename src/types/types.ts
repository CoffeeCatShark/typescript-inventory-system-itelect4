

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
    managerID: string,
    managerName: string,
    authLevel: AuthorizationLvl
}

export interface Supplier{
    supplierId: string, 
    supplier_name: string,
    type: SupplierType,
    deliveryBoxID: number
}

/**
 *--------------------------------------------------------------TYPES------------------------------------------------------------*
 */

export type DeliveryBox = {
    deliveryBoxID: string,
    ownerID: string
    itemsID: string[]
}


export type Storage = {
    itemID: string[]
}


export type Item = 
{
    itemID: string,
    itemName: string,
    supplierID: string
    supplierPrice: number,
    itemType: SupplierType,
    deliveredQuantity: number
}


export type CurrentUser =
    | {
        id: string;
        name: string;
        role: "Supplier";
      }
    | {
        id: string;
        name: string;
        role: "Manager";
        authLevel: AuthorizationLvl;
      };
//----------------------------------------------------------------------------------------------------------------------------------------