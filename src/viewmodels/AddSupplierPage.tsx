import { useState } from "react";
import type { Supplier } from '../types/types';
import { globalID, incrementID, deliveryBoxes } from '../data/database';
import { SupplierType, DeliveryBox } from '../types/types';
import { add } from "../data/helpers";
import { Link } from "react-router-dom";
interface AddSupplierPageProps {
    supplierList: Supplier[];
    setSupplierList: React.Dispatch<React.SetStateAction<Supplier[]>>;
    deliveryBoxesList: DeliveryBox[];
    setDeliveryBoxesList: React.Dispatch<React.SetStateAction<DeliveryBox[]>>;
}

export function AddSupplierPage({
    supplierList,
    setSupplierList,
    deliveryBoxesList,
    setDeliveryBoxesList
}: AddSupplierPageProps) {
    const [supplierName, setSupplierName] = useState("")
    const [supplierType, setSupplierType] = useState(SupplierType.Tools)
    //GENERATE SUPPLIERBOX ID


    function AddNewSupplier(){
        var _globalID: number = globalID + 10

        const newSupplier:Supplier = {
            supplierId:globalID,
            supplier_name:supplierName,
            type:supplierType,
            deliveryBoxID:_globalID
        }
        const newDeliveryBoxInstance: DeliveryBox = {
            deliveryBoxID:_globalID,
            ownerID:globalID,
        }
        incrementID()
        add(supplierList, newSupplier)
        add(deliveryBoxesList, newDeliveryBoxInstance)
        setSupplierList([...supplierList])
        setDeliveryBoxesList([...deliveryBoxesList])
        //for clearing entry 

        setSupplierName("")
        setSupplierType(SupplierType.Tools)
        console.log(deliveryBoxesList)
        console.log(supplierList)
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