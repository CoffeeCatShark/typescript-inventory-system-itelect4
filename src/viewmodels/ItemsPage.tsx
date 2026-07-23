import ItemCard from "./components/ItemCard";
import { Item, Supplier } from "../types/types";
import { remove } from "../data/helpers";
import { Link } from "react-router-dom";
interface ItemsPageProps{
    itemsList:Item[]
    setItemsList: React.Dispatch<React.SetStateAction<Item[]>>;
    suppliersList: Supplier[];
}


export function ItemsPage({itemsList,setItemsList,suppliersList}:ItemsPageProps) {
    const handleSelectItem = (selectedItem: Item): void => {
                remove(itemsList, "itemID", selectedItem.itemID);

    
            
            setItemsList([...itemsList])
        }

    return (
        <>
            {itemsList.map(item => (
                <ItemCard
                    key={item.itemID}
                    item={item}
                    onSelect={handleSelectItem}
                    supplierList={suppliersList}
                />
            ))}

            <Link to="/items/new">
                Add new Items
            </Link>
        </>
    );
} export default ItemsPage