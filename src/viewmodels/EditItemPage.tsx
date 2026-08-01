import { Item, Supplier } from "../types/types";
import { useParams } from "react-router-dom";
import { getById } from "../data/helpers";
import { useState } from "react";
import { update } from "../data/helpers";
import { useNavigate } from "react-router-dom";
interface EditItemPageProps {
    itemList:Item[]
    setItemList: React.Dispatch<React.SetStateAction<Item[]>>
    supplierList: Supplier[];
}


export default function EditItemPage({
    itemList,
    setItemList,
    supplierList,
}: EditItemPageProps) {
    const navigate = useNavigate();
    const { id } = useParams();
    const item = getById(
        itemList,
        "itemID",
        Number(id)
    );
    if (!item) {
        return <h2>Item not found.</h2>;
    }
    const [itemName, setItemName] = useState(item.itemName);
    const [itemPrice, setItemPrice] = useState(item.supplierPrice);
    const [itemQuantity, setItemQuantity] = useState(item.deliveredQuantity);
    const [itemType, setItemType] = useState(item.itemType);
    const [supplierID, setSupplierID] = useState(item.supplierID);

    var newItem:Item = {
        itemID: item.itemID,
        itemName,
        supplierPrice: itemPrice,
        deliveredQuantity: itemQuantity,
        itemType,
        supplierID,
    }


    function saveChanges() {
   
    if (update(itemList, "itemID", newItem)) {
        setItemList([...itemList]);
        navigate("/inventory");
        console.log(newItem, itemList)
    }
    }

    return (
        <>
        <input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
        />

        <input
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(Number(e.target.value))}
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

        <button onClick={saveChanges}>
            Save Changes
        </button>
        </>
    );
}

