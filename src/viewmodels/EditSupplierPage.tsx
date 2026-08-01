import { Supplier } from "../types/types"
import { useParams } from "react-router-dom"
import { getById } from "../data/helpers";
import { useState } from "react";
import { update } from "../data/helpers";
import { useNavigate } from "react-router-dom";
import { SupplierType } from "../types/types";

interface EditSupplierPageProps {
    supplierList: Supplier[];
    setSupplierList: React.Dispatch<React.SetStateAction<Supplier[]>>;
}

export default function EditSupplierPage({
    supplierList,
    setSupplierList,
}: EditSupplierPageProps){
  const navigate = useNavigate();
    const { id } = useParams();

    const supplier = getById(
    supplierList,
    "supplierId",
    Number(id)
    );

if (!supplier) {
    return <h2>Supplier not found.</h2>;
}
    const [supplierName, setSupplierName] = useState(supplier.supplier_name);
    const [supplierType, setSupplierType] = useState(supplier.type);
    const newSupplier: Supplier = {
        supplierId: supplier.supplierId,
        supplier_name: supplierName,
        type: supplierType,
        deliveryBoxID: supplier.deliveryBoxID
    };
    function saveChanges() {
    if (update(supplierList, "supplierId", newSupplier)) {
        setSupplierList([...supplierList]);
        navigate("/suppliers");
    }
    }

    return(
        <>
        <input
    value={supplierName}
    onChange={(e) => setSupplierName(e.target.value)}
/>

<select
    value={supplierType}
    onChange={(e) => setSupplierType(e.target.value as SupplierType)}
>
    <option value={SupplierType.Appliances}>Appliances</option>
    <option value={SupplierType.Tools}>Tools</option>
    <option value={SupplierType.Furnitures}>Furnitures</option>
</select>

<button onClick={saveChanges}>
    Save Changes
</button>
        </>
    )


}