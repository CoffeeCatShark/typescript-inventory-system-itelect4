import { useState, useEffect } from 'react'
import { managers, suppliers, items, deliveryBoxes, mainStorage} from "../src/data/database"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ManagersPage } from './viewmodels/ManagersPage';
import { SuppliersPage } from './viewmodels/SuppliersPage';
import AddItemPage from './viewmodels/AddItemPage';
import AddManagerPage from './viewmodels/AddManagerPage'
import AddSupplierPage from './viewmodels/AddSupplierPage';
import NavigationBar from './viewmodels/components/NavigationBar';
import StoragePage from './viewmodels/StoragePage';
import EditItemPage from './viewmodels/EditItemPage';
import EditSupplierPage from './viewmodels/EditSupplierPage';
import { Item, Manager, Supplier, Storage, DeliveryBox} from './types/types';
function App() {

const [managerList, setManagerList] = useState<Manager[]>([]);
const [supplierList, setSupplierList] = useState<Supplier[]>([]);
const [itemList, setItemList] = useState<Item[]>([]);
const [storageList, setStorageList] = useState<Storage>(mainStorage);
const [deliveryBoxList, setDeliveryBoxList] = useState<DeliveryBox[]>([]);

useEffect(() => {
    const loadItems = async () => {
        setItemList(items);
    };

    loadItems();
}, []);
useEffect(() => {
    const loadManagers = async () => {
        setManagerList(managers);
    };
    loadManagers();
}, []);
useEffect(() => {
    const loadSuppliers = async () => {
        setSupplierList(suppliers);
    };
    loadSuppliers();
}, []);
useEffect(() => {
    const loadDeliveryBoxes = async () => {
        setDeliveryBoxList(deliveryBoxes);
    };
    loadDeliveryBoxes();
}, []);
useEffect(() => {
    const loadInventory = async () => {
        setStorageList(mainStorage);
    };
    loadInventory();
}, []);


                //data stuff

//var accessCtrl: number = 0;

  return (
<>
    

    
    <BrowserRouter>
            <NavigationBar accessCtrl={0} />

        <Routes>
            <Route path='/' element={<StoragePage
                itemsList={itemList}
                setItemsList={setItemList}
                suppliersList={supplierList}
                inventory={storageList}
                />}/>

            <Route path='inventory' element={<StoragePage
                itemsList={itemList}
                setItemsList={setItemList}
                suppliersList={supplierList}
                inventory={storageList}
                />
            }/>


            <Route path='items' element={<StoragePage
                itemsList={itemList}
                setItemsList={setItemList}
                suppliersList={supplierList}
                inventory={storageList}
                />}
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
                        inventory={storageList}
                        setInventory={setStorageList}
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
                        deliveryBoxesList={deliveryBoxList}
                        setDeliveryBoxesList={setDeliveryBoxList}
                        />
                    }
            
            />
            <Route
                path="/items/edit/:id"
                element={
                    <EditItemPage
                        itemList={itemList}
                        setItemList={setItemList}
                        supplierList={supplierList}
                    />
                        }
            />

                        <Route
                path="/suppliers/edit/:id"
                element={
                    <EditSupplierPage
                        supplierList={supplierList}
                        setSupplierList={setSupplierList}
                    />
                }
            />
        </Routes>
    </BrowserRouter>

</>
  )
}

export default App
