import { getById } from "../data/helpers";
import { Item, Storage, Supplier } from "../types/types";
import ItemCard from "./components/ItemCard";
import SupplierCard from "./components/SupplierCard";
import { Link } from "react-router-dom";
import { useState } from "react";
interface StoragePageProps{
    itemsList: Item[]
    suppliersList: Supplier[]
    inventory?: Storage
    setItemsList: React.Dispatch<React.SetStateAction<Item[]>>
}
    var selectedID: number | null

//ADD UPDATE
//ADD REMOVE
export function StoragePage({inventory,itemsList, setItemsList,suppliersList}:StoragePageProps){

    const handleSelectItem = (selectedItem:Item): void => {
        selectedID = selectedItem.itemID

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
                        onSelect={handleSelectItem}
                        handleName={"EDIT"}
                    />
                );
            })}

            <Link to="/items/new">
                Add new Items
            </Link>
        </>
    )


}export default StoragePage