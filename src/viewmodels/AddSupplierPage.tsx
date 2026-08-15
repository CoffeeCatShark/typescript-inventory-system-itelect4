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

    const addSupplier = useDataStore(
        state => state.addSupplier
    );

    const addDeliveryBox = useDataStore(
        state => state.addDeliveryBox
    );

    const [supplierName, setSupplierName] =
        useState("");

    const [supplierType, setSupplierType] =
        useState(SupplierType.Tools);

    const navigate = useNavigate();

    function AddNewSupplier() {

        const deliveryBoxID = globalID + 10;

        const newSupplier: Supplier = {
            supplierId: globalID,
            supplier_name: supplierName,
            type: supplierType,
            deliveryBoxID
        };

        const newDeliveryBox: DeliveryBox = {
            deliveryBoxID,
            ownerID: globalID,
            itemsID: []
        };

        addSupplier(newSupplier);
        addDeliveryBox(newDeliveryBox);

        incrementID();

        navigate("/suppliers");
    }

    return (
        <>
            <h2>Add Supplier</h2>

            <input
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

                <option value={SupplierType.Tools}>
                    Tools
                </option>

                <option value={SupplierType.Furnitures}>
                    Furnitures
                </option>
            </select>

            <button onClick={AddNewSupplier}>
                Add Supplier
            </button>

            <Link to="/suppliers">
                Back to Suppliers List
            </Link>
        </>
    );
}