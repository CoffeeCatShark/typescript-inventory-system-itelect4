import { useState } from "react";
import { Supplier } from "../types/types";
import { remove } from "../data/helpers";
import SupplierCard from "./components/SupplierCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface SuppliersPageProps{
    suppliersList:Supplier[]
    setSuppliersList: React.Dispatch<React.SetStateAction<Supplier[]>>;
}

export function SuppliersPage({suppliersList,setSuppliersList}:SuppliersPageProps) {
     const removeSelectSupplier = (selectedSupplier: Supplier): void => {
                remove(suppliersList, "supplierId", selectedSupplier.supplierId);
            setSuppliersList([...suppliersList])
        }
        const navigate = useNavigate();

    function handleEdit(selectedSupplier: Supplier) {
    navigate(`/suppliers/edit/${selectedSupplier.supplierId}`);
    }

    return (
        <>
            {suppliersList.map(supplier => (
                <SupplierCard
                    key={supplier.supplierId}
                    supplier={supplier}
                    onDelete={removeSelectSupplier}
                    onEdit={handleEdit}
                />
            ))}

        <Link to="/suppliers/new">
        Add New Suppliers
        </Link>
        </>
    );
} export default SuppliersPage