import type { Item } from "../../types/types"

interface ItemCardProps {
    item: Item
    onSelect: (item: Item) => void;
}

function ItemCard({onSelect, item}: ItemCardProps) {
    const handleClick = (): void => {
    onSelect(item);
};


    return (
        <div className="item-card">
            <h3>{item.itemName}</h3>
            <button onClick={handleClick}>Close</button>
        </div>
    )
};
export default ItemCard


