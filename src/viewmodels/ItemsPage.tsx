import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { list, remove } from "@/api/client";
import ItemCard from "@/viewmodels/components/ItemCard";
import { useCurrentUser } from "@/data/store";
import type { Item } from "@/types/types";

export default function ItemPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const userID = useCurrentUser((state) => state.userID);
    const isManager = useCurrentUser((state) => state.isManager);

    // ============================================================
    // GET ITEMS
    // ============================================================

    const {
        data: items,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["items", isManager ? "manager" : userID],
        queryFn: () => {
            if (isManager) {
                return list("items");
            }

            if (!userID) {
                return Promise.resolve([]);
            }

            return list("items", userID);
        }
    });

    // ============================================================
    // GET SUPPLIERS
    // ============================================================

    const {
        data: suppliers,
        isLoading: suppliersLoading
    } = useQuery({
        queryKey: ["suppliers"],
        queryFn: () => list("suppliers")
    });

    // ============================================================
    // DELETE ITEM
    // ============================================================

    const deleteItemMutation = useMutation({
        mutationFn: (itemID: string) => remove(`items/${itemID}`),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["items"]
            });
        }
    });

    function handleDelete(item: Item) {
        deleteItemMutation.mutate(item.id);
    }

    // ============================================================
    // LOADING / ERROR
    // ============================================================

    if (isLoading || suppliersLoading) {
        return <p>Loading items...</p>;
    }

    if (isError) {
        return <p>Failed to load items.</p>;
    }

    // ============================================================
    // UI
    // ============================================================

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
                {(items ?? []).map((item) => (
                    <ItemCard
                        key={item.id}
                        item={item}
                        supplierList={suppliers ?? []}
                        onEdit={(item) => {
                            navigate(`/items/edit/${item.id}`);
                        }}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

        </div>
    );
}