import { useQuery } from "@tanstack/react-query";

import { list } from "@/api/client";
import ItemCard from "@/viewmodels/components/ItemCard";

export default function ItemPage() {

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

            <h1 className="mb-6 text-3xl font-bold">
                Items
            </h1>

            <div className="grid gap-4">

                {(items ?? []).map((item) => (
                    <ItemCard
                        key={item.itemID}
                        item={item}
                        supplierList={suppliers ?? []}
                        onEdit={() => {}}
                        onDelete={() => {}}
                    />
                ))}

            </div>

        </div>
    );
}