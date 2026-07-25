import { Link } from "react-router-dom";
import type { Item, Supplier } from "../types/types";
import ItemCard from "./components/ItemCard";
import { remove } from "../data/helpers";

interface ItemsPageProps {
    itemsList: Item[];
    setItemsList: React.Dispatch<React.SetStateAction<Item[]>>;
    suppliersList: Supplier[];
}

export default function ItemsPage({
    itemsList,
    setItemsList,
    suppliersList,
}: ItemsPageProps) {

    function handleDeleteItem(selectedItem: Item): void {
        remove(itemsList, "itemID", selectedItem.itemID);
        setItemsList([...itemsList]);
    }

    return (
        <>
            <h1>Items</h1>

            <Link to="/items/new">
                Add New Item
            </Link>

            <hr />

            {itemsList.length === 0 ? (
                <p>No items found.</p>
            ) : (
                itemsList.map(item => (
                    <ItemCard
                        key={item.itemID}
                        item={item}
                        supplierList={suppliersList}
                        onSelect={handleDeleteItem}
                    />
                ))
            )}
        </>
    );
}