import { Item, Supplier } from "../types/types";
import { useParams } from "react-router-dom";
import { getById } from "../data/helpers";


interface EditItemPageProps {
    itemList:Item[]
    setItemList: React.Dispatch<React.SetStateAction<Item[]>>
    supplierList: Supplier[];
}

export default function EditItemPage({
    itemList,
    setItemList,
    supplierList,
}: EditItemPageProps) {

    const { id } = useParams();

    const item = getById(
        itemList,
        "itemID",
        Number(id)
    );

    if (!item) {
        return <h2>Item not found.</h2>;
    }

    return (
        <>
            {/* form goes here */}
        </>
    );
}