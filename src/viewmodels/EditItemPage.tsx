import { useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";
import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import type { Item, Supplier } from "../types/types";
import { SupplierType } from "../types/types";

import {
    getItems,
    getSuppliers,
    updateItem
} from "../api/client";

export default function EditItemPage() {

    const { id } = useParams();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data: itemList = [],
        isLoading
    } = useQuery({
        queryKey: ["items"],
        queryFn: getItems
    });

    const { data: supplierList = [] } = useQuery({
        queryKey: ["suppliers"],
        queryFn: getSuppliers
    });

    const saveItem = useMutation({
        mutationFn: updateItem,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["items"]
            });
            navigate("/inventory");
        }
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const item = itemList.find(
        item => item.itemID === Number(id)
    );

    if (!item) {
        return <h2>Item not found.</h2>;
    }

    return (
        <EditItemForm
            item={item}
            supplierList={supplierList}
            onSave={updatedItem =>
                saveItem.mutate(updatedItem)
            }
            isSaving={saveItem.isPending}
        />
    );
}


interface EditItemFormProps {
    item: Item;
    supplierList: Supplier[];
    onSave: (item: Item) => void;
    isSaving: boolean;
}


function EditItemForm({
    item,
    supplierList,
    onSave,
    isSaving
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

        onSave(updatedItem);
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

            <button
                onClick={saveChanges}
                disabled={isSaving}
            >
                {isSaving ? "Saving..." : "Save Changes"}
            </button>
        </>
    );
}
