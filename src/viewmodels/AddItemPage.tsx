import { useState } from "react";
import type { Item, Supplier } from "../types/types";
import { SupplierType } from "../types/types";
import { add } from "../data/helpers";
import { globalID, incrementID } from "../data/database"
import { Link } from "react-router-dom";
interface AddItemPageProps {
    itemList: Item[];
    setItemList: React.Dispatch<React.SetStateAction<Item[]>>;
    supplierList: Supplier[]
}

function AddItemPage({
    itemList,
    setItemList,
    supplierList
}: AddItemPageProps) {

    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemType, setItemType] = useState(SupplierType.Appliances);
    const [supplierID, setSupplierID] = useState(supplierList[0]?.supplierId ?? 0);


    function AddNewItem() {
        const newItem: Item = {
            itemID: globalID,
            itemName,
            itemType,
            supplierID,
            supplierPrice: itemPrice,
            deliveredQuantity: itemQuantity,
        };

        incrementID();

        add(itemList, newItem);

        setItemList([...itemList]);

        //for clearing entry
        setItemName("");
        setItemPrice(0);
        setItemQuantity(0);
        setItemType(SupplierType.Appliances);
        setSupplierID(0)
    }

    return (
        <>
            <input
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
            />

            <input
                type="number"
                placeholder="Price"
                value={itemPrice}
                onChange={(e) => setItemPrice(Number(e.target.value))}
            />

            
            <input
                type="number"
                placeholder="Quantity"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(Number(e.target.value))}
            />

            <select
                value={supplierID}
                onChange={(e) => setSupplierID(Number(e.target.value))}
            >
                {supplierList.map(supplier => (
                    <option
                        key={supplier.supplierId}
                        value={supplier.supplierId}
                    >
                            
                        {supplier.supplier_name}
                    </option>
                ))}
            </select>

            <select
                value={itemType}
                onChange={(e) => setItemType(e.target.value as SupplierType)}
            >
                <option value={SupplierType.Appliances}>Appliances</option>
                <option value={SupplierType.Tools}>Tools</option>
                <option value={SupplierType.Furnitures}>Furnitures</option>
            </select>

            <button onClick={AddNewItem}>
                Add Item
            </button>
        
        <Link to="/items">Back</Link>
        </>
    );
}

export default AddItemPage;