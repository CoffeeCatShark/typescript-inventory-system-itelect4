import type { Item, Supplier } from "../../types/types"
import { getById } from '../../data/helpers'
interface ItemCardProps {
    item: Item
    onSelect: (item: Item) => void;
    supplierList: Supplier[]
    handleName?: String
}

function ItemCard({onSelect, item, supplierList,handleName}: ItemCardProps) {
    const handleClick = (): void => {
    onSelect(item);
};

    const itemBrand = getById(supplierList,"supplierId",item.supplierID);

    return (
        <div className="item-card">
            <h3>Item Name: {item.itemName}</h3>
            <h3>Item Brand: {itemBrand?.supplier_name}</h3>
            <h3>Item price: :{item.supplierPrice}</h3>
            <button onClick={handleClick}>{handleName}</button>
        </div>
    )
};
export default ItemCard


