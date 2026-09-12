import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { get, update } from "@/api/client";
import { useCurrentUser } from "@/data/store";
import {
    SupplierType,
    type Item
} from "@/types/types";

export default function EditItemPage() {
  
    const navigate = useNavigate();

    // Logged-in supplier
    const userID = useCurrentUser(
        (state) => state.userID
    );
     
    // Item being edited
    const { itemId } = useParams();
     console.log(`CURRENT ITEM ID:${itemId}`)
    const [itemName, setItemName] = useState("");
    const [supplierPrice, setSupplierPrice] = useState(0);
    const [deliveredQuantity, setDeliveredQuantity] = useState(0);
    const [itemType, setItemType] = useState(
        SupplierType.Appliances
    );

    const {
        data: item,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["item", itemId],
        queryFn: () => get(`items/${itemId}`),
        enabled: !!itemId
    });

    useEffect(() => {

        if (item) {

            setItemName(item.itemName);
            setSupplierPrice(item.supplierPrice);
            setDeliveredQuantity(item.deliveredQuantity);
            setItemType(item.itemType);

        }

    }, [item]);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        if (!itemId || !userID) {
            return;
        }

        // Make sure the item belongs
        // to the logged-in supplier
        if (item?.supplierID !== userID) {
            return;
        }

        const updatedItem: Partial<
            Omit<Item, "id">
        > = {
            itemName,
            supplierID: userID,
            supplierPrice,
            deliveredQuantity,
            itemType
        };

        await update(
            `items/${itemId}`,
            updatedItem
        );

        navigate("/items");
    }

    if (isLoading) {
        return <p>Loading item...</p>;
    }

    if (isError || !item) {
        return <p>Failed to load item.</p>;
    }

    // Prevent editing another supplier's item
    if (item.supplierID !== userID) {
        return (
            <p>
                You do not have permission to edit this item.
            </p>
        );
    }

    return (
        <div className="mx-auto w-full max-w-2xl p-6">

            <h1 className="mb-6 text-3xl font-bold">
                Edit Item
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                {/* Item Name */}
                <div>
                    <label className="block font-medium">
                        Item Name
                    </label>

                    <input
                        type="text"
                        value={itemName}
                        onChange={(event) =>
                            setItemName(event.target.value)
                        }
                        className="w-full rounded-md border px-3 py-2"
                        required
                    />
                </div>


                {/* Supplier */}
                <div>
                    <label className="block font-medium">
                        Supplier
                    </label>

                    <input
                        type="text"
                        value={userID}
                        className="w-full rounded-md border px-3 py-2"
                        readOnly
                    />
                </div>


                {/* Supplier Price */}
                <div>
                    <label className="block font-medium">
                        Supplier Price
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={supplierPrice}
                        onChange={(event) =>
                            setSupplierPrice(
                                Number(event.target.value)
                            )
                        }
                        className="w-full rounded-md border px-3 py-2"
                        required
                    />
                </div>


                {/* Delivered Quantity */}
                <div>
                    <label className="block font-medium">
                        Delivered Quantity
                    </label>

                    <input
                        type="number"
                        min="0"
                        value={deliveredQuantity}
                        onChange={(event) =>
                            setDeliveredQuantity(
                                Number(event.target.value)
                            )
                        }
                        className="w-full rounded-md border px-3 py-2"
                        required
                    />
                </div>


                {/* Item Type */}
                <div>
                    <label className="block font-medium">
                        Item Type
                    </label>

                    <select
                        value={itemType}
                        onChange={(event) =>
                            setItemType(
                                event.target.value as SupplierType
                            )
                        }
                        className="w-full rounded-md border px-3 py-2"
                        required
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
                </div>


                {/* Buttons */}
                <div className="flex gap-2 pt-4">

                    <button
                        type="submit"
                        className="rounded-md px-4 py-2 font-medium shadow-sm transition hover:opacity-90"
                    >
                        SAVE
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/items")}
                        className="rounded-md px-4 py-2 font-medium shadow-sm transition hover:opacity-90"
                    >
                        CANCEL
                    </button>

                </div>

            </form>

        </div>
    );
}
