import { useState } from "react";
import type { Supplier } from '../types/types';
import { globalID, incrementID } from "../data/database";
import { SupplierType} from '../types/types';
import { add } from "../data/helpers";
import { Link } from "react-router-dom";
interface AddSupplierPageProps {
    supplierList: Supplier[];
    setSupplierList: React.Dispatch<React.SetStateAction<Supplier[]>>;
}

export function AddSupplierPage({
    supplierList,
    setSupplierList,
}: AddSupplierPageProps) {
    const [supplierName, setSupplierName] = useState("")
    const [supplierType, setSupplierType] = useState(SupplierType.Tools)
    //ADD DELIVERY BOX ID


    function AddNewSupplier(){
        
        const newSupplier:Supplier = {
            supplierId:globalID,
            supplier_name:supplierName,
            type:supplierType,
            deliveryBoxID:0     //CHANGE 
        }


        incrementID()
        add(supplierList, newSupplier)
        setSupplierList([...supplierList])

        //for clearing entry 

        setSupplierName("")
        setSupplierType(SupplierType.Tools)
    }

    return (<>
   
        <input
                placeholder="Supplier Name"
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


        <button onClick={AddNewSupplier}>
                Add Supplier
            </button>

        <Link to={"/suppliers"}>
            Back to Suppliers List
        </Link>

    </>)
}export default AddSupplierPage