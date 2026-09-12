import { useQuery } from "@tanstack/react-query";

import { list } from "@/api/client";
import SupplierCard from "@/viewmodels/components/SupplierCard";

export default function SuppliersPage() {

    const {
        data: suppliers,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["suppliers"],
        queryFn: () => list("suppliers")
    });

    if (isLoading) {
        return <p>Loading suppliers...</p>;
    }

    if (isError) {
        return <p>Failed to load suppliers.</p>;
    }

    return (
        <div className="mx-auto w-full max-w-5xl p-6">

            <h1 className="mb-6 text-3xl font-bold">
                Suppliers
            </h1>

            <div className="grid gap-4">

                {(suppliers ?? []).map((supplier) => (
                    <SupplierCard
                        key={supplier.supplierId}
                        supplier={supplier}
                        onEdit={() => {}}
                        onDelete={() => {}}
                    />
                ))}

            </div>

        </div>
    );
}