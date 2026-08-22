import { useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import type { Item } from "../types/types";
import { SupplierType } from "../types/types";

import { getById } from "../data/helpers";
import { useDataStore } from "../data/store";

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

    const [itemName, setItemName] =
        useState<string>(item.itemName);

    const [itemPrice, setItemPrice] =
        useState<number>(item.supplierPrice);

    const [itemQuantity, setItemQuantity] =
        useState<number>(item.deliveredQuantity);

    const [itemType, setItemType] =
        useState<SupplierType>(item.itemType);

    const [supplierID, setSupplierID] =
        useState<number>(item.supplierID);


    function saveChanges() {

        const updatedItem: Item = {
            itemID: item.itemID,
            itemName: itemName,
            supplierPrice: itemPrice,
            deliveredQuantity: itemQuantity,
            itemType: itemType,
            supplierID: supplierID
        };

        updateItem(updatedItem);

        navigate("/inventory");
    }


    return (
        <>
            <h2>Edit Item</h2>

            <input
                type="text"
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
                onChange={e =>
                    setItemType(
                        e.target.value as SupplierType
                    )
                }
            >
                <option value={SupplierType.Appliances}>
                    Appliances
                </option>

                <option value={SupplierType.Furnitures}>
                    Furnitures
                </option>

                <option value={SupplierType.Tools}>
                    Tools
                </option>
            </select>

            <button onClick={saveChanges}>
                Save Changes
            </button>
        </>
    );
}