//Inventory System
/*

Core entities: Manager - Supplier - Items

Enum Entities: Manager(High Auth, Low Auth) - Supplier(Appliances, Furnitures, Tools) - Customer(Registered, Unregistered, Flagged)

Refresh Feature: Item Count 

Generative Writing: Q&A, Description

Pick & Omit

Solo-buildable: 

------------------
Need: Cart(Customer) - Storage(Manager) - DeliveryBox(Supplier)
*/
//---------------------------------------------------------------------------------------------------------------------------------------------- */
/**
 *--------------------------------------------------------------ENUMS------------------------------------------------------------*
 */
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
    name: String,
    authLevel: AuthorizationLvl
}

export interface Supplier{
    supplier_name: String,
    type: SupplierType,
}

/**
 *--------------------------------------------------------------TYPES------------------------------------------------------------*
 */

export type DeliveryBox = {
    owner: Supplier
    box: Item
}


export type Storage = {
    storage: Item
}


export type Item = 
{
    id: number,
    itemName: String,
    supplier: Supplier
    supplierPrice: number,
    itemType: SupplierType,
    deliveredQuantity: number
}


export type ItemShort = Pick<Item, "id" | "itemName" | "deliveredQuantity">

//*
// ----------------------------------------------------------------------------------------------------------------------
//  */

let globalID: number = 0




function addManager(_name:string, lvl:AuthorizationLvl): Manager {
return{
    name: _name,
    authLevel: lvl
    }
}

function addSupplierItems(globalID:number,_name:string, _supplier:Supplier, _supplierPrice:number, _itemType: SupplierType, _deliveredQuantity: number): Item{
    return{
    id:globalID,
    itemName: _name,
    supplier: _supplier,
    supplierPrice: _supplierPrice,
    itemType: _itemType,
    deliveredQuantity: _deliveredQuantity
    }
}

function addDeliveryBox(_owner:Supplier,_deliveryBox:Item):DeliveryBox{
    return{
        owner: _owner,
        box: _deliveryBox
    }
}


function addSupplier(supplierName:string,type:SupplierType): Supplier{
    
return{
    supplier_name: supplierName,
    type: type,
}

}

function getById<T extends { id: number }>(
items: T[],
id: number
): T | undefined {
return items.find((item) => item.id === id);
}




                        
    let supplierName: string = "Apple"
    let type: SupplierType = SupplierType.Tools
    
    let supplier: Supplier = addSupplier(supplierName, type) 

    let _itemName: string = "iPhone"
    let _supplier: Supplier = supplier
    let _supplierPrice:number = 1.23
    let _itemType: SupplierType = SupplierType.Tools
    let _deliveredQuantity:number = 25
    let managers: Manager[] = []
    let suppliers: Supplier[] = []
    let deliveryboxes: DeliveryBox[] = []
    let itemsbox: Item[] = []
    let storageList: Item[] = []
    let shortItems: ItemShort[] = []
    /**
     * ----
     */
    function addItemShort(_id:number,_name:string,_quantity:number):ItemShort{
        return {
            id:_id,
            itemName:_name,
            deliveredQuantity:_quantity
        }
    }

        var itemShort: ItemShort = addItemShort(globalID,"ShortPhone",12)
        globalID++
        shortItems.push(itemShort)
        var itemShort: ItemShort = addItemShort(globalID,"ShortPhone2",123)
        globalID++
        shortItems.push(itemShort)
    /**
     * ----
     */
    let supplierItems: Item = addSupplierItems(globalID,_itemName,_supplier,_supplierPrice,_itemType,_deliveredQuantity)
    globalID++
    itemsbox.push(supplierItems)
    storageList.push(supplierItems)

    /**
     * ----
     */
    
    function getItemsShort(supplierItems: Omit<Item, 'id' | 'itemtype' | 'deliveredQuantity'>): string | undefined{
        return `Name: ${supplierItems.itemName}, Brand: ${supplierItems.supplier.supplier_name}, Price: ${supplierItems.supplierPrice}`
    }

    /**
     * ----
     */
    let deliverybox: DeliveryBox = addDeliveryBox(supplier,supplierItems)
    
    let manager: Manager = addManager("Juan", AuthorizationLvl.High)

    //FOR TESTING 
    supplierItems = addSupplierItems(globalID,"TEST1",supplier,12334,_itemType,500)
    itemsbox.push(supplierItems)
    /**
     * =========================================================================================================================
     */
    managers.push(manager)
    suppliers.push(supplier)
    deliveryboxes.push(deliverybox)
    storageList.push(supplierItems)
    //itemsbox.push(supplierItems)
    //console.log(JSON.stringify(itemsbox, null, 2));

    let getItems: string = getItemsShort(supplierItems)?? "None"


    let test: Item | undefined = getById<Item>(storageList,2)
    let shortTest: ItemShort | undefined = getById<ItemShort>(shortItems,0)
    console.log(test)
    console.log(shortTest)
    console.log("=================")
    console.log(storageList)
    console.log(shortItems)
    console.log("=================")
    console.log(getItems)