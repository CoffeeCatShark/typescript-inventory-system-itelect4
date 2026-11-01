import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import { list, remove } from "@/api/client";
import SupplierCard from "@/viewmodels/components/SupplierCard";
import { useNavigate } from "react-router-dom";
import type { Supplier } from "@/types/types";

export default function SuppliersPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // ============================================================
    // GET SUPPLIERS
    // ============================================================

    const {
        data: suppliers,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["suppliers"],
        queryFn: () => list("suppliers")
    });

    // ============================================================
    // DELETE SUPPLIER
    // ============================================================

    const deleteSupplierMutation = useMutation({
        mutationFn: (supplierID: string) =>
            remove(`suppliers/${supplierID}`),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["suppliers"]
            });

            queryClient.invalidateQueries({
                queryKey: ["items"]
            });
        }
    });

    function handleDelete(supplier: Supplier) {
        deleteSupplierMutation.mutate(supplier.id);
    }

    // ============================================================
    // LOADING / ERROR
    // ============================================================

    if (isLoading) {
        return <p>Loading suppliers...</p>;
    }

    if (isError) {
        return <p>Failed to load suppliers.</p>;
    }

    // ============================================================
    // UI
    // ============================================================

    return (
        <div className="mx-auto w-full max-w-5xl p-6">

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Suppliers
                </h1>

                <button
                    className="rounded-md px-4 py-2 font-medium shadow-sm transition hover:opacity-90"
                    onClick={() => navigate("/suppliers/new")}
                >
                    ADD SUPPLIER
                </button>
            </div>

            <div className="grid gap-4">
                {(suppliers ?? []).map((supplier) => (
                    <SupplierCard
                        key={supplier.id}
                        supplier={supplier}
                        onEdit={() => {
                            navigate(`/suppliers/edit/${supplier.id}`);
                        }}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

        </div>
    );
}