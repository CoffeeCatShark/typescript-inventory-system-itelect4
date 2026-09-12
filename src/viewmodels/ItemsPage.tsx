import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { list } from "@/api/client";
import ItemCard from "@/viewmodels/components/ItemCard";
import { useCurrentUser } from "@/data/store";

export default function ItemPage() {
    const navigate = useNavigate();
    const userID = useCurrentUser((state) => state.userID);

    const {
        data: items,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["items"],
        queryFn: () => list("items")
    });

    const {
        data: suppliers,
        isLoading: suppliersLoading
    } = useQuery({
        queryKey: ["suppliers"],
        queryFn: () => list("suppliers")
    });

    if (isLoading || suppliersLoading) {
        return <p>Loading items...</p>;
    }

    if (isError) {
        return <p>Failed to load items.</p>;
    }

    return (
        <div className="mx-auto w-full max-w-5xl p-6">

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Items
                </h1>

                <button
                    className="rounded-md px-4 py-2 font-medium shadow-sm transition hover:opacity-90"
                    onClick={() => navigate("/items/new")}
                >
                    ADD ITEM
                </button>
            </div>

            <div className="grid gap-4">

                {(items ?? []).map((item) => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        supplierList={suppliers ?? []}
                        onEdit={(item) => {
                            navigate(`/items/edit/${item.id}`);
                        }}
                        onDelete={() => {}}
                    />
                ))}

            </div>

        </div>
    );
}