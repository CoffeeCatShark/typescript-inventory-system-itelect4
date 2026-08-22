import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { Item } from "../types/types";
import { SupplierType } from "../types/types";

import { globalID, incrementID } from "../data/database";
import { useDataStore } from "../data/store";

export default function AddItemPage() {

    const navigate = useNavigate();

    // Zustand
    const supplierList = useDataStore(
        state => state.suppliers
    );

    const addItem = useDataStore(
        state => state.addItem
    );

    const addToStorage = useDataStore(
        state => state.addToStorage
    );

    // Form state
    const [itemName, setItemName] = useState<string>("");
    const [itemPrice, setItemPrice] = useState<number>(0);
    const [itemQuantity, setItemQuantity] = useState<number>(0);

    const [itemType, setItemType] = useState<SupplierType>(
        SupplierType.Appliances
    );

    const [supplierID, setSupplierID] = useState<number>(
        supplierList[0]?.supplierId ?? 0
    );

    const itemNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        itemNameRef.current?.focus();
    }, []);

    function AddNewItem() {

        const newItem: Item = {
            itemID: globalID,
            itemName: itemName,
            itemType: itemType,
            supplierID: supplierID,
            supplierPrice: itemPrice,
            deliveredQuantity: itemQuantity
        };

        // Add to Zustand
        addItem(newItem);

        // Add item ID to storage
        addToStorage(newItem.itemID);

        // Generate next ID
        incrementID();

        // Return to inventory
        navigate("/inventory");
    }

    return (
        <>
            <h2>Add New Item</h2>

            <input
                ref={itemNameRef}
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={e =>
                    setItemName(e.target.value)
                }
            />

            <input
                type="number"
                placeholder="Price"
                value={itemPrice}
                onChange={e =>
                    setItemPrice(Number(e.target.value))
                }
            />

            <input
                type="number"
                placeholder="Quantity"
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

            <button onClick={AddNewItem}>
                Add Item
            </button>

            <br />

            <Link to="/inventory">
                Back to Inventory
            </Link>
        </>
    );
}