import { getById, remove } from "../data/helpers";
import { Item, Storage, Supplier } from "../types/types";
import ItemCard from "./components/ItemCard";
import SupplierCard from "./components/SupplierCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface StoragePageProps{
    itemsList: Item[]
    suppliersList: Supplier[]
    inventory?: Storage
    setItemsList: React.Dispatch<React.SetStateAction<Item[]>>
}



//ADD UPDATE
//ADD REMOVE
export function StoragePage({inventory,itemsList, setItemsList,suppliersList}:StoragePageProps){
    const [selectedID, setSelectedID] = useState<number | null>(null);
const navigate = useNavigate();

    const handleEdit = (selectedItem:Item): void => {
        navigate(`/items/edit/${selectedItem.itemID}`);
    }
        function handleDelete(selectedItem: Item): void {
            remove(itemsList, "itemID", selectedItem.itemID);
            setItemsList([...itemsList]);
        }
    //GO TO ITEMS 
    if(!inventory) return null

    else
    return(
        <>
            {inventory.itemID.map(id => {
                const item = getById(itemsList,"itemID",id)
                if (!item) return null;

                return (
                    <ItemCard
                        key={item.itemID}
                        item={item}
                        supplierList={suppliersList}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                );
            })}

            <Link to="/items/new">
                Add new Items
            </Link>
        </>
    )


}export default StoragePage