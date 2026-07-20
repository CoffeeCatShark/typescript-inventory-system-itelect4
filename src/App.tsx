import { useState } from 'react'
import { managers, suppliers, items, deliveryBoxes, mainStorage} from "../src/data/database"
import ItemCard from './viewmodels/components/ItemCard';
import { Item } from './types/types';

function App() {

const [managerList, setManagerList] = useState(managers);
const [supplierList, setSupplierList] = useState(suppliers);
const [itemList, setItemList] = useState(items);
const [deliveryBoxesList, setDeliveryBoxesList] = useState(deliveryBoxes);
const [mainStorageList, setMainStorageList] = useState(mainStorage);

        // 

const handleSelectItem = (selectedItem: Item): void => {
    setItemList(prev =>
        prev.filter(item => item.itemID !== selectedItem.itemID)
    );
};      //copy paste


  return (
    <>
    
    {itemList.map(item => (
        <ItemCard 
        
        key={item.itemID}
        item={item}
        onSelect={handleSelectItem}
        
        />
    ))}

    </>
  )
}

export default App
