import { useState } from "react";
import type { Item } from "../types/types";
import { SupplierType } from "../types/types";
import { add } from "../data/helpers";
import { globalID, incrementID } from "../data/database"
interface AddItemPageProps {
    itemList: Item[];
    setItemList: React.Dispatch<React.SetStateAction<Item[]>>;
}

function AddItemPage({
    itemList,
    setItemList,
}: AddItemPageProps) {

    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemType, setItemType] = useState(SupplierType.Appliances);

    function AddNewItem() {
        const newItem: Item = {
            itemID: globalID,
            itemName,
            itemType,
            supplierID: 0, // REPLACE 
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
        </>
    );
}

export default AddItemPage;