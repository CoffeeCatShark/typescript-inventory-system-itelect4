import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import { SupplierType } from "../types/types";
import type { CreateItem } from "../api/types";

import { getSuppliers, createItem } from "../api/client";

export default function AddItemPage() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: supplierList = [] } = useQuery({
        queryKey: ["suppliers"],
        queryFn: getSuppliers
    });

    const addItem = useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["items"]
            });
            navigate("/inventory");
        }
    });

    // Form state
    const [itemName, setItemName] = useState<string>("");
    const [itemPrice, setItemPrice] = useState<number>(0);
    const [itemQuantity, setItemQuantity] = useState<number>(0);

    const [itemType, setItemType] = useState<SupplierType>(
        SupplierType.Appliances
    );

    const [supplierID, setSupplierID] = useState<number>(0);

    const itemNameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        itemNameRef.current?.focus();
    }, []);

    // Once suppliers load, default the select to the first one
    useEffect(() => {
        if (supplierList.length > 0 && supplierID === 0) {
            setSupplierID(supplierList[0].supplierId);
        }
    }, [supplierList, supplierID]);

    function AddNewItem() {

        const newItem: CreateItem = {
            itemName: itemName,
            itemType: itemType,
            supplierID: supplierID,
            supplierPrice: itemPrice,
            deliveredQuantity: itemQuantity
        };

        // POST to db.json via json-server
        addItem.mutate(newItem);
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

            <button
                onClick={AddNewItem}
                disabled={addItem.isPending}
            >
                {addItem.isPending ? "Adding..." : "Add Item"}
            </button>

            <br />

            <Link to="/inventory">
                Back to Inventory
            </Link>
        </>
    );
}
