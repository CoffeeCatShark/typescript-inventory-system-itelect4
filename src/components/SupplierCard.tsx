import type { Supplier } from "../types/index"

interface SupplierCardProps {
    supplier: Supplier
}

function SupplierCard({supplier}: SupplierCardProps) {
    return (
        <div className="supplier-card">
            <h3>Supplier Name: {supplier.supplier_name}</h3>
            <h3>Supplier Type: {supplier.type}</h3>
        </div>
    )
};
export default SupplierCard