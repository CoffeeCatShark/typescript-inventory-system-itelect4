import { useQuery } from "@tanstack/react-query";
import { list, remove } from "@/api/client";
import SupplierCard from "@/viewmodels/components/SupplierCard";
import { useNavigate } from "react-router-dom";
import { Supplier } from "@/types/types";
export default function SuppliersPage() {

    async function handleDelete(supplier: Supplier) {
    await remove(`deliveryBoxes/${supplier.deliveryBoxID}`);
    await remove(`suppliers/${supplier.id}`)
}

const navigate = useNavigate()
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
                        onDelete={(supplier) => {handleDelete(supplier)}}
                    />
                ))}

            </div>

        </div>
    );
}