import { Item } from "../../types/types";

export function useItems(
    itemList: Item[],
    setItemList: React.Dispatch<React.SetStateAction<Item[]>>
) {
    function addItem(item: Item) {
        setItemList(prev => [...prev, item]);
    }

    function removeItem(itemID: number) {
        setItemList(prev =>
            prev.filter(item => item.itemID !== itemID)
        );
    }

    return {
        itemList,
        addItem,
        removeItem,
    };
}