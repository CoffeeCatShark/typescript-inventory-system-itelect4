import type { Item, Supplier } from "../../types/types"
import { getById } from '../../data/helpers'
interface ItemCardProps {
    item: Item
    onEdit?: (item: Item) => void;
    onDelete?: (item: Item) => void;
    onView?: (item: Item) => void;
    supplierList: Supplier[]
    handleName?: String
}

function ItemCard({onEdit,onDelete,onView, item, supplierList}: ItemCardProps) {

    const itemBrand = getById(supplierList,"supplierId",item.supplierID);

    return (
        <div className="item-card">
            <h3>Item Name: {item.itemName}</h3>
            <h3>Item Brand: {itemBrand?.supplier_name}</h3>
            <h3>Item price: :{item.supplierPrice}</h3>
            {onView && (
                <button onClick={() => onView(item)}>
                    View
                </button>
            )}

            {onEdit && (
                <button onClick={() => onEdit(item)}>
                    Edit
                </button>
            )}

            {onDelete && (
                <button onClick={() => onDelete(item)}>
                    Delete
                </button>
            )}
        </div>
    )
};
export default ItemCard


