import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type {
    Supplier,
    DeliveryBox
} from "../types/types";

import { SupplierType } from "../types/types";

import {
    globalID,
    incrementID
} from "../data/database";

import { useDataStore } from "../data/store";

export default function AddSupplierPage() {

    const navigate = useNavigate();

    const addSupplier = useDataStore(
        state => state.addSupplier
    );

    const [supplierName, setSupplierName] =
        useState<string>("");

    const [supplierType, setSupplierType] =
        useState<SupplierType>(
            SupplierType.Tools
        );

    function AddNewSupplier() {

        const deliveryBoxID = globalID + 10;

        const newSupplier: Supplier = {
            supplierId: globalID,
            supplier_name: supplierName,
            type: supplierType,
            deliveryBoxID: deliveryBoxID
        };

        addSupplier(newSupplier);

        incrementID();

        navigate("/suppliers");
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

            <button onClick={AddNewSupplier}>
                Add Supplier
            </button>

            <br />

            <Link to="/suppliers">
                Back to Suppliers
            </Link>
        </>
    );
}