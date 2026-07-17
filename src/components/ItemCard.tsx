import type { Item } from "../types/index"

interface ItemCardProps {
    item: Item
}

function ItemCard({item}: ItemCardProps) {
    return (
        <div className="item-card">
            <h3>{item.itemName}</h3>
            <h3>{item.supplier.supplier_name}</h3>
            <h3>{item.itemType}</h3>
            <h3>{item.supplierPrice} Pesos</h3>
        </div>
    )
};
export default ItemCard


