import type { Supplier } from "../../types/types";

interface SupplierCardProps {

    supplier: Supplier;

    onEdit: (supplier: Supplier) => void;

    onDelete: (supplier: Supplier) => void;
}


export default function SupplierCard({
    supplier,
    onEdit,
    onDelete
}: SupplierCardProps) {

    return (
        <div className="supplier-card">

            <h3>
                Supplier:
                {" "}
                {supplier.supplier_name}
            </h3>

            <p>
                Supplier ID:
                {" "}
                {supplier.supplierId}
            </p>

            <p>
                Type:
                {" "}
                {supplier.type}
            </p>

            <p>
                Delivery Box:
                {" "}
                {supplier.deliveryBoxID}
            </p>


            <button
                onClick={() => onEdit(supplier)}
            >
                EDIT
            </button>


            <button
                onClick={() => onDelete(supplier)}
            >
                DELETE
            </button>

        </div>
    );
}