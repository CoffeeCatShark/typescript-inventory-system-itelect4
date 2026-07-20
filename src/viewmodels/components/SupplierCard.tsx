import type { Supplier } from "../../types/types"

interface SupplierCardProps {
    supplier: Supplier
    onSelect: (supplier: Supplier) => void
}

function SupplierCard({onSelect, supplier}: SupplierCardProps) {
     const handleClick = (): void => {
     onSelect(supplier)}
     
    return (
        <div className="supplier-card">
            <h3>Supplier Name: {supplier.supplier_name}</h3>
            <h3>Supplier Type: {supplier.type}</h3>
            <button onClick={handleClick}>Close</button>
        </div>
    )
};
export default SupplierCard