import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";

import NavigationBar from "./viewmodels/components/NavigationBar";

import ItemsPage from "./viewmodels/ItemsPage";

import ManagersPage from "./viewmodels/ManagersPage";
import AddManagerPage from "./viewmodels/AddManagerPage";

import SuppliersPage from "./viewmodels/SuppliersPage";
import AddSupplierPage from "./viewmodels/AddSupplierPage";

import AddItemPage from "./viewmodels/AddItemPage";
import EditItemPage from "./viewmodels/EditItemPage";
import EditSupplierPage from "./viewmodels/EditSupplierPage";
import "./index.css";
import MainPage from "./viewmodels/MainPage"

const queryClient =
    new QueryClient();


function App() {

    return (
        <QueryClientProvider
            client={queryClient}
        >

            <BrowserRouter>

                <NavigationBar
                    accessCtrl={0}
                />

                <Routes>

                    <Route
                        path="/"
                        element={
                            <MainPage />
                        }
                    />


                    <Route
                        path="/items"
                        element={
                            <ItemsPage />
                        }
                    />

                    <Route
                        path="/items/new"
                        element={
                            <AddItemPage />
                        }
                    />

                    <Route
                        path="/items/edit/:itemId"
                        element={<EditItemPage />}
                    />

                    <Route
                        path="/managers"
                        element={
                            <ManagersPage />
                        }
                    />

                    <Route
                        path="/managers/new"
                        element={
                            <MainPage />
                            //<AddManagerPage />
                        }
                    />

                    <Route
                        path="/suppliers"
                        element={
                            <SuppliersPage />
                        }
                    />

                    <Route
                        path="/suppliers/new"
                        element={
                            <AddSupplierPage />
                        }
                    />

                    <Route
                        path="/suppliers/edit/:supplierId"
                        element={
                            <EditSupplierPage />
                        }
                    />

                    <Route
                        path="/main"
                        element={
                            <MainPage />
                        }
                    />

                </Routes>

            </BrowserRouter>

        </QueryClientProvider>
    );
}

export default App;