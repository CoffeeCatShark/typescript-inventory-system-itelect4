import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { create, list } from "@/api/client";
import { SupplierType, type Item, type Supplier } from "@/types/types";
import { useCurrentUser } from "@/data/store";

export default function AddItemPage() {
    const userID = useCurrentUser((state) => state.userID);
    const navigate = useNavigate();
    const [itemName, setItemName] = useState("");
    const [supplierPrice, setSupplierPrice] = useState(0);
    const [deliveredQuantity, setDeliveredQuantity] = useState(0);
    const [itemType, setItemType] = useState(
        SupplierType.Appliances
    );
    console.log(userID);
    if(!userID){
        return
        //ADD GO BACK TO PAGE
    }


    const {
        data: suppliers,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["suppliers"],
        queryFn: () => list("suppliers")
    });

    async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
) {
    event.preventDefault();

    if (!userID) {
        return;
    }

    const newItem: Omit<Item, "id"> = {
        itemName,
        supplierID: userID,
        supplierPrice,
        deliveredQuantity,
        itemType
    };

    await create<Omit<Item, "id">, Item>(
        "items",
        newItem
    );

    navigate("/items");
}

    if (isLoading) {
        return <p>Loading suppliers...</p>;
    }

    if (isError) {
        return <p>Failed to load suppliers.</p>;
    }

    return (
        <div className="mx-auto w-full max-w-2xl p-6">

            <h1 className="mb-6 text-3xl font-bold">
                Add Item
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

                    <select
                        value={userID}
                        className="w-full rounded-md border px-3 py-2"
                        required
                    >
                        <option value="">
                            Select a supplier
                        </option>

                        {(suppliers ?? []).map(
                            (supplier: Supplier) => (
                                <option
                                    key={supplier.id}
                                    value={supplier.id}
                                >
                                    {supplier.supplier_name}
                                </option>
                            )
                        )}
                    </select>
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
                        ADD ITEM
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

