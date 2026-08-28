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

import StoragePage from "./viewmodels/StoragePage";
import ItemsPage from "./viewmodels/ItemsPage";

import ManagersPage from "./viewmodels/ManagersPage";
import AddManagerPage from "./viewmodels/AddManagerPage";

import SuppliersPage from "./viewmodels/SuppliersPage";
import AddSupplierPage from "./viewmodels/AddSupplierPage";

import AddItemPage from "./viewmodels/AddItemPage";
import EditItemPage from "./viewmodels/EditItemPage";
import EditSupplierPage from "./viewmodels/EditSupplierPage";


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
                            <StoragePage />
                        }
                    />

                    <Route
                        path="/inventory"
                        element={
                            <StoragePage />
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
                        path="/items/edit/:id"
                        element={
                            <EditItemPage />
                        }
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
                            <AddManagerPage />
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
                        path="/suppliers/edit/:id"
                        element={
                            <EditSupplierPage />
                        }
                    />

                </Routes>

            </BrowserRouter>

        </QueryClientProvider>
    );
}

export default App;