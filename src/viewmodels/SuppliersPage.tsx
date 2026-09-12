import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/data/store";
import { list } from "@/api/client";
import SupplierCard from "@/viewmodels/components/SupplierCard";
import { useNavigate } from "react-router-dom";
export default function SuppliersPage() {
const navigate = useNavigate()
const userID = useCurrentUser((state) => state.userID);
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
                        onDelete={() => {}}
                    />
                ))}

            </div>

        </div>
    );
}