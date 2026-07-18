import type { Item } from "../../types/index"

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
            <h3>{item.supplier.supplier_name}</h3>
            <h3>{item.itemType}</h3>
            <h3>{item.supplierPrice} Pesos</h3>
            <button onClick={handleClick}>Close</button>
        </div>
    )
};
export default ItemCard


