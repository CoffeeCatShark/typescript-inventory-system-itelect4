import ItemCard from "./components/ItemCard";
import { useState } from "react";
import { items } from "../data/database";
import { Item } from "../types/types";

export function ItemsPage() {
    const handleSelectItem = (selectedItem: Item): void => {
        setItemList(prev =>
            prev.filter(item => item.itemID !== selectedItem.itemID)
        );
    };    
    const [itemList, setItemList] = useState(items);

    return (
        <>
            {itemList.map(item => (
                <ItemCard
                    key={item.itemID}
                    item={item}
                    onSelect={handleSelectItem}
                />
            ))}
        </>
    );
} export default ItemsPage