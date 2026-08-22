import { useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import type { Supplier } from "../types/types";
import { SupplierType } from "../types/types";

import { getById } from "../data/helpers";
import { useDataStore } from "../data/store";

export default function EditSupplierPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const supplierList = useDataStore(
        state => state.suppliers
    );

    const updateSupplier = useDataStore(
        state => state.updateSupplier
    );

    const supplier = getById(
        supplierList,
        "supplierId",
        Number(id)
    );

    if (!supplier) {
        return <h2>Supplier not found.</h2>;
    }

    return (
        <EditSupplierForm
            supplier={supplier}
            updateSupplier={updateSupplier}
            navigate={navigate}
        />
    );
}


interface EditSupplierFormProps {
    supplier: Supplier;

    updateSupplier: (
        supplier: Supplier
    ) => void;

    navigate: ReturnType<typeof useNavigate>;
}


function EditSupplierForm({
    supplier,
    updateSupplier,
    navigate
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

        updateSupplier(updatedSupplier);

        navigate("/suppliers");
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

            <button onClick={saveChanges}>
                Save Changes
            </button>
        </>
    );
}