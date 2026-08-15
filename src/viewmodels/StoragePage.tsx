import { useNavigate } from "react-router-dom";
import { getById } from "../data/helpers";
import { useDataStore } from "../data/store";
import ItemCard from "./components/ItemCard";
import type { Item } from "../types/types";

export default function StoragePage() {

    const itemsList = useDataStore(
        state => state.items
    );

    const suppliersList = useDataStore(
        state => state.suppliers
    );

    const inventory = useDataStore(
        state => state.storage
    );

    const navigate = useNavigate();

    function handleEdit(item: Item) {
        navigate(`/items/edit/${item.itemID}`);
    }

    return (
        <>
            <h2>Inventory</h2>

            {inventory.itemID.map(id => {

                const item = getById(
                    itemsList,
                    "itemID",
                    id
                );

                if (!item) {
                    return null;
                }

                return (
                    <ItemCard
                        key={item.itemID}
                        item={item}
                        supplierList={suppliersList}
                        onEdit={handleEdit}
                    />
                );
            })}

            <button
                onClick={() =>
                    navigate("/items/new")
                }
            >
                Add Item
            </button>
        </>
    );
}