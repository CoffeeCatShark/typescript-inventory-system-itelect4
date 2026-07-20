import { useState } from 'react'
import { managers, suppliers, items, deliveryBoxes, mainStorage} from "../src/data/database"
import ItemCard from './viewmodels/components/ItemCard';
import ManagerCard from './viewmodels/components/ManagerCard';
import SupplierCard from './viewmodels/components/SupplierCard';
import { Item, Manager, Supplier } from './types/types';

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

const handleSelectManager = (selectedManager: Manager): void => {
    setManagerList(prev =>
        prev.filter(manager => manager.managerID !== selectedManager.managerID)
    );
};   

const handleSelectSupplier = (selectedSupplier: Supplier): void => {
    setSupplierList(prev =>
        prev.filter(supplier => supplier.supplierId !== selectedSupplier.supplierId)
    )
}

  return (
<>
    {itemList.map(item => (
        <ItemCard
            key={item.itemID}
            item={item}
            onSelect={handleSelectItem}
        />
    ))}

    {managerList.map(manager => (
        <ManagerCard
            key={manager.managerID}
            manager={manager}
            onSelect={handleSelectManager}
        />
    ))}

    {supplierList.map(supplier => (
        <SupplierCard
            key={supplier.supplierId}
            supplier={supplier}
            onSelect={handleSelectSupplier}
        />
    ))}

</>
  )
}

export default App
