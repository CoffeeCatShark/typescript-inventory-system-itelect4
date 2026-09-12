import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { list, remove } from "@/api/client";
import ItemCard from "@/viewmodels/components/ItemCard";
import { useCurrentUser } from "@/data/store";
import { Item } from "@/types/types";

export default function ItemPage() {
    const navigate = useNavigate();
    const userID = useCurrentUser((state) => state.userID);
    const isManager = useCurrentUser((state) => state.isManager);

    async function handleDelete(item: Item) {
    await remove(`items/${item.id}`);
}


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

    const visibleItems = (items ?? []).filter((item) => {
    if (isManager) {
        return true;
    }

    return item.supplierID === userID;
    });


    return (
        <div className="mx-auto w-full max-w-5xl p-6">

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Items
                </h1>

                {!isManager && (
                <button
                    onClick={() => navigate("/items/new")}
                    className="rounded-md px-4 py-2 font-medium shadow-sm"
                >
                    ADD ITEM
                </button>
            )}
            </div>

            <div className="grid gap-4">

                {(visibleItems ?? []).map((item) => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        supplierList={suppliers ?? []}
                        onEdit={(item) => {
                            navigate(`/items/edit/${item.id}`);
                        }}
                        onDelete={(item) => {handleDelete(item)}}
                    />
                ))}

            </div>

        </div>
    );
}