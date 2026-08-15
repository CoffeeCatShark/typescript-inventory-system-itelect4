import { Link, useNavigate } from "react-router-dom";
import { useDataStore } from "../data/store";
import ItemCard from "./components/ItemCard";
import type { Item } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../data/api";

export default function ItemsPage() {

    const navigate = useNavigate();

    // Items come from TanStack Query
    const {
        data: itemsList = [],
        isLoading,
        error
    } = useQuery({
        queryKey: ["items"],
        queryFn: getItems
    });

    // Suppliers still come from Zustand
    const suppliersList = useDataStore(
        state => state.suppliers
    );

    // -------------------------
    // EDIT
    // -------------------------

    function handleEdit(item: Item) {
        navigate(`/items/edit/${item.itemID}`);
    }


    // -------------------------
    // DELETE
    // -------------------------

    const removeItem = useDataStore(
        state => state.removeItem
    );

    function handleDelete(item: Item) {
        removeItem(item.itemID);
    }


    // -------------------------
    // LOADING
    // -------------------------

    if (isLoading) {
        return <p>Loading items...</p>;
    }


    // -------------------------
    // ERROR
    // -------------------------

    if (error) {
        return <p>Failed to load items.</p>;
    }


    // -------------------------
    // PAGE
    // -------------------------

    return (
        <>
            <h2>Items</h2>

            {itemsList.map(item => (
                <ItemCard
                    key={item.itemID}
                    item={item}
                    supplierList={suppliersList}
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