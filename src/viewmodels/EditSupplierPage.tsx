import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { get, update } from "@/api/client";
import { SupplierType, type Supplier } from "@/types/types";

export default function EditSupplierPage() {
    const { supplierId } = useParams();
    const navigate = useNavigate();

    const [supplierName, setSupplierName] = useState("");
    const [type, setType] = useState<Supplier["type"]>(SupplierType.Appliances);
    const [deliveryBoxID, setDeliveryBoxID] = useState("");

    const {
        data: supplier,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["supplier", supplierId],
        queryFn: () => get(`suppliers/${supplierId}`),
        enabled: !!supplierId
    });

    useEffect(() => {
        if (supplier) {
            setSupplierName(supplier.supplier_name);
            setType(supplier.type);
            setDeliveryBoxID(String(supplier.deliveryBoxID));
        }
    }, [supplier]);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!supplierId) {
            return;
        }

        await update(
            `suppliers/${supplierId}`,
            {
                supplier_name: supplierName,
                type: type,
                deliveryBoxID: deliveryBoxID
            }
        );

        navigate("/suppliers");
    }

    if (isLoading) {
        return <p>Loading supplier...</p>;
    }

    if (isError || !supplier) {
        return <p>Failed to load supplier.</p>;
    }

    return (
        <div className="mx-auto w-full max-w-2xl p-6">

            <h1 className="mb-6 text-3xl font-bold">
                Edit Supplier
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <div>
                    <label className="block font-medium">
                        Supplier Name
                    </label>

                    <input
                        type="text"
                        value={supplierName}
                        onChange={(event) =>
                            setSupplierName(event.target.value)
                        }
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>


                <div>
                    <label className="block font-medium">
                        Type
                    </label>

                    <select
                        value={type}
                        onChange={(event) =>
                            setType(
                                event.target.value as Supplier["type"]
                            )
                        }
                        className="w-full rounded-md border px-3 py-2"
                    >
                        <option value="Appliances">
                            Appliances
                        </option>

                        <option value="Tools">
                            Tools
                        </option>

                        <option value="Furnitures">
                            Furnitures
                        </option>
                    </select>
                </div>


                <div>
                    <label className="block font-medium">
                        Delivery Box ID
                    </label>

                    <input
                        type="text"
                        readOnly
                        value={deliveryBoxID}
                        className="w-full rounded-md border px-3 py-2"
                    />
                </div>


                <div className="flex gap-2 pt-4">

                    <button
                        type="submit"
                        className="rounded-md px-4 py-2 font-medium shadow-sm transition hover:opacity-90"
                    >
                        SAVE
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