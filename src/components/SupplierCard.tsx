import type { Supplier } from "../types/index"

interface SupplierCardProps {
    supplier: Supplier
}

function SupplierCard({supplier}: SupplierCardProps) {
    return (
        <div className="supplier-card">
            <h3>{supplier.supplier_name}</h3>
            <h3>{supplier.type}</h3>
        </div>
    )
};
export default SupplierCard