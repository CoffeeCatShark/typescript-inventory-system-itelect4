import { useState } from 'react'
import { managers, suppliers, items, deliveryBoxes, mainStorage} from "../src/data/database"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemsPage } from './viewmodels/ItemsPage';
import { ManagersPage } from './viewmodels/ManagersPage';
import { SuppliersPage } from './viewmodels/SuppliersPage';
import AddItemPage from './viewmodels/AddItemPage';
import AddManagerPage from './viewmodels/AddManagerPage'

function App() {

const [managerList, setManagerList] = useState(managers);
const [supplierList, setSupplierList] = useState(suppliers);
const [itemList, setItemList] = useState(items);
const [deliveryBoxesList, setDeliveryBoxesList] = useState(deliveryBoxes);
const [mainStorageList, setMainStorageList] = useState(mainStorage);
                //data stuff

  return (
<>
    
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<ItemsPage/>}/>
            <Route path='items' element={<ItemsPage/>}/>
            <Route path='managers' element={<ManagersPage/>}/>
            <Route path='suppliers' element={<SuppliersPage/>}/>
            <Route
                path="/items/new"
                    element={
                    <AddItemPage
                        itemList={itemList}
                        setItemList={setItemList}
                    />  
                            }
            />

            <Route  
                path="/managers/new"
                    element={
                    <AddManagerPage
                        managerList={managerList}
                        setManagerList={setManagerList}
                        />
                    }
            />

            


        </Routes>
    </BrowserRouter>

</>
  )
}

export default App
