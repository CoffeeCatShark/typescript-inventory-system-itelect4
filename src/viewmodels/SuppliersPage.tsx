import { useState } from "react";
import { Supplier } from "../types/types";
import { suppliers } from "../data/database";
import SupplierCard from "./components/SupplierCard";



export function SuppliersPage() {
    const handleSelectSupplier = (selectedSupplier: Supplier): void => {
    setSupplierList(prev =>
        prev.filter(supplier => supplier.supplierId !== selectedSupplier.supplierId)
    )
}
    const [supplierList, setSupplierList] = useState(suppliers);
    return (
        <>
            {supplierList.map(supplier => (
                <SupplierCard
                    key={supplier.supplierId}
                    supplier={supplier}
                    onSelect={handleSelectSupplier}
                />
            ))}
        </>
    );
} export default SuppliersPage