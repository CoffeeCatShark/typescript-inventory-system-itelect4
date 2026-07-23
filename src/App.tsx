import { useState } from 'react'
import { managers, suppliers, items, deliveryBoxes, mainStorage} from "../src/data/database"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemsPage } from './viewmodels/ItemsPage';
import { ManagersPage } from './viewmodels/ManagersPage';
import { SuppliersPage } from './viewmodels/SuppliersPage';
import AddItemPage from './viewmodels/AddItemPage';
import AddManagerPage from './viewmodels/AddManagerPage'
import AddSupplierPage from './viewmodels/AddSupplierPage';
import NavigationBar from './viewmodels/components/NavigationBar';

function App() {

const [managerList, setManagerList] = useState(managers);
const [supplierList, setSupplierList] = useState(suppliers);
const [itemList, setItemList] = useState(items);
const [deliveryBoxesList, setDeliveryBoxesList] = useState(deliveryBoxes);
const [mainStorageList, setMainStorageList] = useState(mainStorage);
                //data stuff

var accessCtrl: number = 0;

  return (
<>
    

    
    <BrowserRouter>
            <NavigationBar accessCtrl={0} />

        <Routes>
            <Route path='/' element={<ItemsPage
                itemsList={itemList}
                setItemsList={setItemList}
                suppliersList={supplierList}/>}/>

            <Route path='items' element={<ItemsPage
                itemsList={itemList}
                setItemsList={setItemList}
                suppliersList={supplierList}/>}
                />

            <Route path='managers' element={<ManagersPage
                managersList={managerList}
                setManagersList={setManagerList}/>}/>

            <Route path='suppliers' element={<SuppliersPage
                suppliersList={supplierList}
                setSuppliersList={setSupplierList}/>}/>

            <Route
                path="/items/new" element={<AddItemPage
                        itemList={itemList}
                        setItemList={setItemList}
                        supplierList={supplierList}
                    />}/>

            <Route  
                path="/managers/new"
                    element={
                    <AddManagerPage
                        managerList={managerList}
                        setManagerList={setManagerList}
                        />
                    }
            />

            <Route
                path="/suppliers/new"
                    element={
                    <AddSupplierPage
                        supplierList={supplierList}
                        setSupplierList={setSupplierList}
                        deliveryBoxesList={deliveryBoxesList}
                        setDeliveryBoxesList={setDeliveryBoxesList}
                        />
                    }
            
            />


        </Routes>
    </BrowserRouter>

</>
  )
}

export default App
