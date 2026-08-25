import { Link, useNavigate } from "react-router-dom";
import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import SupplierCard from "./components/SupplierCard";

import type { Supplier } from "../types/types";

import {
    getSuppliers,
    deleteSupplier
} from "../api/client";

export default function SuppliersPage() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data: supplierList = [],
        isLoading,
        error
    } = useQuery({
        queryKey: ["suppliers"],
        queryFn: getSuppliers
    });

    const removeSupplier = useMutation({
        mutationFn: deleteSupplier,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["suppliers"]
            });
        }
    });

    function handleEdit(supplier: Supplier) {
        navigate(`/suppliers/edit/${supplier.supplierId}`);
    }

    function handleDelete(supplier: Supplier) {
        removeSupplier.mutate(supplier.supplierId);
    }

    if (isLoading) {
        return <p>Loading suppliers...</p>;
    }

    if (error) {
        return (
            <p>
                Could not reach the API. Make sure
                `npm run api` is running on port 3001.
            </p>
        );
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
