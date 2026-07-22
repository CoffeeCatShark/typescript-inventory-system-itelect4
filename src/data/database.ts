import { Manager, Supplier, DeliveryBox, Item, SupplierType, AuthorizationLvl, Storage } from "../types/types.ts"



    export var globalID = 10

    export function incrementID() {
    globalID++
    }export default incrementID



export var managers: Manager[] = [
    {
        managerID: 0,
        authLevel: AuthorizationLvl.High,
        managerName:"Christian Custodio"
    }
,
    {
        managerID: 1,
        authLevel: AuthorizationLvl.Low,
        managerName:"Itchan Custodio"
    }
,
    {
        managerID: 2,
        authLevel: AuthorizationLvl.Pending,
        managerName:"Tano"
    }

]

export var suppliers: Supplier[] = [
    {
        supplierId: 3,
        supplier_name: "Apple",
        type: SupplierType.Tools,
        deliveryBoxID: 4,
    }

]



export var deliveryBoxes: DeliveryBox[] = [
    {
        deliveryBoxID: 4,
        ownerID: 3,
        itemsID: [5],
    }
]

export var items: Item[] = [
    {
    itemID: 5,
    itemName: "Iphone",
    supplierID: 3,
    supplierPrice: 450.00,
    itemType: SupplierType.Tools,
    deliveredQuantity: 20
    }
]

export var mainStorage: Storage[] = [
    {
        itemID:[5]
    }
]

//**================================================== GUIDE
// Type = Type.(Manager, Supplier, etc.) 
// Key = Identifier(supplierID, managerID, etc.)
// Value = Key Value(ID = 5. value is 5.)
//
// add<T>(Type, value = key);
//getById<T>(Type, key, value = key);
// update<T>(Type, key, value = type);
// remove<T>(Type, key, value = key);

//  */



