import { Link, useNavigate } from "react-router-dom";

import ItemCard from "./components/ItemCard";

import type { Item } from "../types/types";

import { useDataStore } from "../data/store";

export default function ItemsPage() {

    const navigate = useNavigate();

    const itemsList = useDataStore(
        state => state.items
    );

    const supplierList = useDataStore(
        state => state.suppliers
    );

    const removeItem = useDataStore(
        state => state.removeItem
    );

    function handleEdit(item: Item) {
        navigate(`/items/edit/${item.itemID}`);
    }

    function handleDelete(item: Item) {
        removeItem(item.itemID);
    }

    return (
        <>
            <h2>Items</h2>

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