import type { Item, Supplier } from "../../types/types";
import { getById } from "../../data/helpers";

interface ItemCardProps {

    item: Item;

    supplierList: Supplier[];

    onEdit: (item: Item) => void;

    onDelete: (item: Item) => void;
}


export default function ItemCard({
    item,
    supplierList,
    onEdit,
    onDelete
}: ItemCardProps) {

    const supplier = getById(
        supplierList,
        "supplierId",
        item.supplierID
    );


    return (
        <div className="item-card">

            <h3>
                Item Name: {item.itemName}
            </h3>

            <p>
                Item ID: {item.itemID}
            </p>

            <p>
                Supplier:
                {" "}
                {supplier?.supplier_name ??
                    "Unknown Supplier"}
            </p>

            <p>
                Price: ₱{item.supplierPrice}
            </p>

            <p>
                Quantity:
                {" "}
                {item.deliveredQuantity}
            </p>

            <p>
                Type: {item.itemType}
            </p>


            <button
                onClick={() => onEdit(item)}
            >
                EDIT
            </button>


            <button
                onClick={() => onDelete(item)}
            >
                DELETE
            </button>

        </div>
    );
}