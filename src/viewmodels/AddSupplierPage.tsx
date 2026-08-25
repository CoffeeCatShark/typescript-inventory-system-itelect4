import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import { SupplierType } from "../types/types";
import type { CreateSupplier } from "../api/types";

import { createSupplier } from "../api/client";

export default function AddSupplierPage() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const addSupplier = useMutation({
        mutationFn: createSupplier,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["suppliers"]
            });
            navigate("/suppliers");
        }
    });

    const [supplierName, setSupplierName] =
        useState<string>("");

    const [supplierType, setSupplierType] =
        useState<SupplierType>(
            SupplierType.Tools
        );

    function AddNewSupplier() {

        // NOTE: no delivery box is created here, so this
        // defaults to 0 (unassigned). Wire up
        // createDeliveryBox() from api/client.ts if you need
        // every new supplier to own one.
        const newSupplier: CreateSupplier = {
            supplier_name: supplierName,
            type: supplierType,
            deliveryBoxID: 0
        };

        addSupplier.mutate(newSupplier);
    }

    return (
        <>
            <h2>Add New Supplier</h2>

            <input
                type="text"
                placeholder="Supplier Name"
                value={supplierName}
                onChange={e =>
                    setSupplierName(e.target.value)
                }
            />

            <select
                value={supplierType}
                onChange={e =>
                    setSupplierType(
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
                onClick={AddNewSupplier}
                disabled={addSupplier.isPending}
            >
                {addSupplier.isPending ? "Adding..." : "Add Supplier"}
            </button>

            <br />

            <Link to="/suppliers">
                Back to Suppliers
            </Link>
        </>
    );
}
