import { Link, useNavigate } from "react-router-dom";
import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import ItemCard from "./components/ItemCard";

import type { Item } from "../types/types";

import {
    getItems,
    getSuppliers,
    deleteItem
} from "../api/client";

// NOTE: db.json doesn't model a separate "storage" resource,
// so this page shows the full item list, same as ItemsPage.
// If you want storage to track a subset of items, add a
// "storage" resource to db.json and a getStorage()/
// updateStorage() pair to api/client.ts.

export default function StoragePage() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        data: itemsList = [],
        isLoading,
        error
    } = useQuery({
        queryKey: ["items"],
        queryFn: getItems
    });

    const { data: supplierList = [] } = useQuery({
        queryKey: ["suppliers"],
        queryFn: getSuppliers
    });

    const removeItem = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["items"]
            });
        }
    });

    function handleEdit(item: Item) {
        navigate(`/items/edit/${item.itemID}`);
    }

    function handleDelete(item: Item) {
        removeItem.mutate(item.itemID);
    }

    if (isLoading) {
        return <p>Loading inventory...</p>;
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
            <h2>Inventory</h2>

            {itemsList.map(item => (
                <ItemCard
                    key={item.itemID}
                    item={item}
                    supplierList={supplierList}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}

            <Link to="/items/new">
                Add New Item
            </Link>
        </>
    );
}
