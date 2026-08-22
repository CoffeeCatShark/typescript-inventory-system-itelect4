import { Link } from "react-router-dom";

import ManagerCard from "./components/ManagerCard";

import type { Manager } from "../types/types";

import { useDataStore } from "../data/store";

export default function ManagersPage() {

    const managersList = useDataStore(
        state => state.managers
    );

    const removeManager = useDataStore(
        state => state.removeManager
    );

    function handleDelete(manager: Manager) {
        removeManager(manager.managerID);
    }

    return (
        <>
            <h2>Managers</h2>

            {managersList.map(manager => (
                <ManagerCard
                    key={manager.managerID}
                    manager={manager}
                    onDelete={handleDelete}
                />
            ))}

            <Link to="/managers/new">
                Add New Manager
            </Link>
        </>
    );
}