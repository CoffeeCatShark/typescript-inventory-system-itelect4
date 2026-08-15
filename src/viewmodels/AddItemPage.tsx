import { useRef, useState } from "react";
import type { Item } from "../types/types";
import { SupplierType } from "../types/types";
import { globalID, incrementID } from "../data/database";
import { Link, useNavigate } from "react-router-dom";
import { useDataStore } from "../data/store";

export default function AddItemPage() {

    const supplierList = useDataStore(
        state => state.suppliers
    );

    const addItem = useDataStore(
        state => state.addItem
    );

    const addToStorage = useDataStore(
        state => state.addToStorage
    );

    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemType, setItemType] = useState(
        SupplierType.Appliances
    );

    const [supplierID, setSupplierID] = useState(
        supplierList[0]?.supplierId ?? 0
    );

    const itemNameRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    function AddNewItem() {

        const newItem: Item = {
            itemID: globalID,
            itemName,
            itemType,
            supplierID,
            supplierPrice: itemPrice,
            deliveredQuantity: itemQuantity
        };

        incrementID();

        // Zustand "API" calls
        addItem(newItem);
        addToStorage(newItem.itemID);

        navigate("/inventory");
    }

    return (
        <>
            <input
                ref={itemNameRef}
                value={itemName}
                placeholder="Item Name"
                onChange={(e) =>
                    setItemName(e.target.value)
                }
            />

            <input
                type="number"
                placeholder="Price"
                value={itemPrice}
                onChange={(e) =>
                    setItemPrice(Number(e.target.value))
                }
            />

            <input
                type="number"
                placeholder="Quantity"
                value={itemQuantity}
                onChange={(e) =>
                    setItemQuantity(Number(e.target.value))
                }
            />

            <select
                value={supplierID}
                onChange={(e) =>
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
                onChange={(e) =>
                    setItemType(
                        e.target.value as SupplierType
                    )
                }
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

            <button onClick={AddNewItem}>
                Add Item
            </button>

            <Link to="/inventory">
                Back to Inventory
            </Link>
        </>
    );
}