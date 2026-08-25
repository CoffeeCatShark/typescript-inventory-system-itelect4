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

import type { Supplier } from "../types/types";
import { SupplierType } from "../types/types";

import {
    getSuppliers,
    updateSupplier
} from "../api/client";

export default function EditSupplierPage() {

    const { id } = useParams();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data: supplierList = [],
        isLoading
    } = useQuery({
        queryKey: ["suppliers"],
        queryFn: getSuppliers
    });

    const saveSupplier = useMutation({
        mutationFn: updateSupplier,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["suppliers"]
            });
            navigate("/suppliers");
        }
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const supplier = supplierList.find(
        supplier => supplier.supplierId === Number(id)
    );

    if (!supplier) {
        return <h2>Supplier not found.</h2>;
    }

    return (
        <EditSupplierForm
            supplier={supplier}
            onSave={updatedSupplier =>
                saveSupplier.mutate(updatedSupplier)
            }
            isSaving={saveSupplier.isPending}
        />
    );
}


interface EditSupplierFormProps {
    supplier: Supplier;
    onSave: (supplier: Supplier) => void;
    isSaving: boolean;
}


function EditSupplierForm({
    supplier,
    onSave,
    isSaving
}: EditSupplierFormProps) {

    const [supplierName, setSupplierName] =
        useState<string>(
            supplier.supplier_name
        );

    const [supplierType, setSupplierType] =
        useState<SupplierType>(
            supplier.type
        );


    function saveChanges() {

        const updatedSupplier: Supplier = {
            supplierId: supplier.supplierId,
            supplier_name: supplierName,
            type: supplierType,
            deliveryBoxID: supplier.deliveryBoxID
        };

        onSave(updatedSupplier);
    }


    return (
        <>
            <h2>Edit Supplier</h2>

            <input
                type="text"
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
                onClick={saveChanges}
                disabled={isSaving}
            >
                {isSaving ? "Saving..." : "Save Changes"}
            </button>
        </>
    );
}
