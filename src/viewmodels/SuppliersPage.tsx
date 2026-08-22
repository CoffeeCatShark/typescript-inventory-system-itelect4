import { Link, useNavigate } from "react-router-dom";

import SupplierCard from "./components/SupplierCard";

import type { Supplier } from "../types/types";

import { useDataStore } from "../data/store";

export default function SuppliersPage() {

    const navigate = useNavigate();

    const supplierList = useDataStore(
        state => state.suppliers
    );

    const removeSupplier = useDataStore(
        state => state.removeSupplier
    );

    function handleEdit(supplier: Supplier) {
        navigate(`/suppliers/edit/${supplier.supplierId}`);
    }

    function handleDelete(supplier: Supplier) {
        removeSupplier(supplier.supplierId);
    }

    return (
        <>
            <h2>Suppliers</h2>

            {supplierList.map(supplier => (
                <SupplierCard
                    key={supplier.supplierId}
                    supplier={supplier}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}

            <Link to="/suppliers/new">
                Add New Supplier
            </Link>
        </>
    );
}