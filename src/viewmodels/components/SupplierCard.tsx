import type { Supplier } from "../../types/types"

interface SupplierCardProps {
    supplier: Supplier
    onEdit?: (supplier:Supplier) => void;
    onDelete?: (supplier:Supplier) => void;
    onView?: (supplier:Supplier) => void;
}

function SupplierCard({onEdit,onDelete,onView, supplier}: SupplierCardProps) {
    return (
        <div className="supplier-card">
            <h3>Supplier Name: {supplier.supplier_name}</h3>
            <h3>Supplier Type: {supplier.type}</h3>
            {onView && (
                <button onClick={() => onView(supplier)}>
                    View
                </button>
            )}

            {onEdit && (
                <button onClick={() => onEdit(supplier)}>
                    Edit
                </button>
            )}

            {onDelete && (
                <button onClick={() => onDelete(supplier)}>
                    Delete
                </button>
            )}
        </div>
    )
};
export default SupplierCard