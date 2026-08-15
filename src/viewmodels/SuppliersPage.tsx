import { Link, useNavigate } from "react-router-dom";
import { useDataStore } from "../data/store";
import SupplierCard from "./components/SupplierCard";
import type { Supplier } from "../types/types";

export default function SuppliersPage() {

    const suppliersList = useDataStore(
        state => state.suppliers
    );

    const removeSupplier = useDataStore(
        state => state.removeSupplier
    );

    const navigate = useNavigate();

    function handleEdit(supplier: Supplier) {
        navigate(
            `/suppliers/edit/${supplier.supplierId}`
        );
    }

    function handleDelete(supplier: Supplier) {
        removeSupplier(supplier.supplierId);
    }

    return (
        <>
            {suppliersList.map(supplier => (
                <SupplierCard
                    key={supplier.supplierId}
                    supplier={supplier}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}

            <Link to="/suppliers/new">
                Add Supplier
            </Link>
        </>
    );
}