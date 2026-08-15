import { useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import type { Item } from "../types/types";
import { getById } from "../data/helpers";
import { useDataStore } from "../data/store";
import { SupplierType } from "../types/types";

export default function EditItemPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const itemList = useDataStore(
        state => state.items
    );

    const supplierList = useDataStore(
        state => state.suppliers
    );

    const updateItem = useDataStore(
        state => state.updateItem
    );

    const item = getById(
        itemList,
        "itemID",
        Number(id)
    );

    if (!item) {
        return <h2>Item not found.</h2>;
    }

    return (
        <EditItemForm
            item={item}
            supplierList={supplierList}
            updateItem={updateItem}
            navigate={navigate}
        />
    );
}


interface EditItemFormProps {
    item: Item;
    supplierList: {
        supplierId: number;
        supplier_name: string;
    }[];
    updateItem: (item: Item) => void;
    navigate: ReturnType<typeof useNavigate>;
}


function EditItemForm({
    item,
    supplierList,
    updateItem,
    navigate
}: EditItemFormProps) {

    const [itemName, setItemName] = useState(
        item.itemName
    );

    const [itemPrice, setItemPrice] = useState(
        item.supplierPrice
    );

    const [itemQuantity, setItemQuantity] = useState(
        item.deliveredQuantity
    );

    const [itemType, setItemType] = useState(
        item.itemType
    );

    const [supplierID, setSupplierID] = useState(
        item.supplierID
    );
        function handleItemTypeChange(
            e: React.ChangeEvent<HTMLSelectElement>
        ) {
            const value = Number(e.target.value);

            if (value === 0) {
                setItemType(SupplierType.Appliances);
            } else if (value === 1) {
                setItemType(SupplierType.Tools);
            } else if (value === 2) {
                setItemType(SupplierType.Furnitures);
            }
        }
    function saveChanges() {

        const updatedItem: Item = {
            itemID: item.itemID,
            itemName,
            supplierPrice: itemPrice,
            deliveredQuantity: itemQuantity,
            itemType,
            supplierID
        };

        updateItem(updatedItem);

        navigate("/inventory");
    }

    return (
        <>
            <h2>Edit Item</h2>

            <input
                value={itemName}
                onChange={e =>
                    setItemName(e.target.value)
                }
            />

            <input
                type="number"
                value={itemPrice}
                onChange={e =>
                    setItemPrice(Number(e.target.value))
                }
            />

            <input
                type="number"
                value={itemQuantity}
                onChange={e =>
                    setItemQuantity(Number(e.target.value))
                }
            />

            <select
                value={supplierID}
                onChange={e =>
                    setSupplierID(Number(e.target.value))
                }
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
                onChange={handleItemTypeChange}
            >
                <option value={SupplierType.Appliances}>
                    Appliances
                </option>

                <option value={SupplierType.Tools}>
                    Tools
                </option>

                <option value={SupplierType.Furnitures}>
                    Furnitures
                </option>
            </select>

            <button onClick={saveChanges}>
                Save Changes
            </button>
        </>
    );
}