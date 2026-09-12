

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
    id: string,
    managerName: string,
    authLevel: AuthorizationLvl
}

export interface Supplier{
    id: string, 
    supplier_name: string,
    type: SupplierType,
    deliveryBoxID: string
}

/**
 *--------------------------------------------------------------TYPES------------------------------------------------------------*
 */

export type DeliveryBox = {
    id: string,
    ownerID: string
    itemsID: string[]
}


export type Storage = {
    itemID: string[]
}


export type Item = 
{
    id: string,
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