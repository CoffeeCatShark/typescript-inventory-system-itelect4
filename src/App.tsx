import { useState } from 'react'
import ItemCard from './components/ItemCard'
import ManagerCard from './components/ManagerCard'
import SupplierCard from './components/SupplierCard'

import { Manager, Supplier, AuthorizationLvl, SupplierType, DeliveryBox, Storage, Item, ItemShort} from './types'

import './App.css'

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
    
    let _manager: Manager = addManager("Juan", AuthorizationLvl.High)

    //FOR TESTING 
    supplierItems = addSupplierItems(globalID,"TEST1",supplier,12334,_itemType,500)
    itemsbox.push(supplierItems)
    /**
     * =========================================================================================================================
     */
    managers.push(_manager)
    suppliers.push(supplier)
    deliveryboxes.push(deliverybox)
    storageList.push(supplierItems)
    //itemsbox.push(supplierItems)
    //console.log(JSON.stringify(itemsbox, null, 2));

    let getItems: string = getItemsShort(supplierItems)?? "None"


    let test: Item | undefined = getById<Item>(storageList,2)
    let shortTest: ItemShort | undefined = getById<ItemShort>(shortItems,0)



//--------------------------------------------------------------------------------
//

let managers_size:number = suppliers.length
let inventory_size:number = itemsbox.length
let suppliers_size:number = suppliers.length

console.log(managers_size)
console.log(inventory_size)
console.log(suppliers_size)

function App() {
const [items, setItems] = useState<Item[]>(itemsbox);

const handleClose = (item: Item) => {
    setItems(prev => prev.filter(i => i.id !== item.id));
};
  return (
    <>
    <ManagerCard manager={_manager} />
    
    {items.map(item => (
            <ItemCard
                key={item.id}
                item={item}
                onSelect={handleClose}
            />
        ))}



    <SupplierCard supplier={suppliers[0]} />

    </>
  )
}

export default App
