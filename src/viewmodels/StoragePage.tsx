import { Link, useNavigate } from "react-router-dom";

import ItemCard from "./components/ItemCard";

import { useDataStore } from "../data/store";

import type { Item } from "../types/types";

export default function StoragePage() {

    const navigate = useNavigate();

    const itemsList = useDataStore(
        state => state.items
    );

    const supplierList = useDataStore(
        state => state.suppliers
    );

    const storage = useDataStore(
        state => state.storage
    );

    function handleEdit(item: Item) {
        navigate(`/items/edit/${item.itemID}`);
    }

    function handleDelete(item: Item) {
        // If you want deletion from storage:
        // removeFromStorage(item.itemID)

        console.log("Delete:", item);
    }

    return (
        <>
            <h2>Inventory</h2>

            {storage.itemID.map(itemID => {

                const item = itemsList.find(
                    item => item.itemID === itemID
                );

                if (!item) {
                    return null;
                }

                return (
                    <ItemCard
                        key={item.itemID}
                        item={item}
                        supplierList={supplierList}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                );
            })}

            <Link to="/items/new">
                Add New Item
            </Link>
        </>
    );
}