
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { create, update } from "@/api/client";
import { SupplierType, type Supplier, type DeliveryBox } from "@/types/types";

export default function AddSupplierPage() {
    const navigate = useNavigate();

    const [supplierName, setSupplierName] = useState("");
    const [type, setType] = useState(SupplierType.Appliances);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        // Create the supplier first
        const newSupplier = await create<
            Omit<Supplier, "id">,
            Supplier
        >(
            "suppliers",
            {
                supplier_name: supplierName,
                type: type,
                deliveryBoxID: "0"
            }
        );

        // Create a delivery box for the new supplier
        const newDeliveryBox = await create<
            Omit<DeliveryBox, "id">,
            DeliveryBox
        >(
            "deliveryBoxes",
            {
                ownerID: newSupplier.id,
                itemsID: []
            }
        );

        // Connect the delivery box to the supplier
        await update(
            `suppliers/${newSupplier.id}`,
            {
                deliveryBoxID: newDeliveryBox.id
            }
        );

        // Return to supplier list
        navigate("/suppliers");
    }

    return (
        <div className="mx-auto w-full max-w-2xl p-6">

            <h1 className="mb-6 text-3xl font-bold">
                Add Supplier
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <div>
                    <label className="mb-1 block font-medium">
                        Supplier Name
                    </label>

                    <input
                        type="text"
                        value={supplierName}
                        onChange={(event) =>
                            setSupplierName(event.target.value)
                        }
                        className="w-full rounded-md border px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1 block font-medium">
                        Type
                    </label>

                    <select
                        value={type}
                        onChange={(event) =>
                            setType(
                                event.target.value as SupplierType
                            )
                        }
                        className="w-full rounded-md border px-3 py-2"
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

                <div className="flex gap-3">

                    <button
                        type="submit"
                        className="rounded-md px-4 py-2 font-medium shadow-sm transition hover:opacity-90"
                    >
                        ADD SUPPLIER
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/suppliers")}
                        className="rounded-md px-4 py-2 font-medium shadow-sm transition hover:opacity-90"
                    >
                        CANCEL
                    </button>

                </div>

            </form>

        </div>
    );
}
