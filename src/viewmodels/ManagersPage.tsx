import { Link, useNavigate } from "react-router-dom";
import { useDataStore } from "../data/store";
import type { Manager } from "../types/types";
import ManagerCard from "./components/ManagerCard";

export default function ManagersPage() {

    const managersList = useDataStore(
        state => state.managers
    );

    const removeManager = useDataStore(
        state => state.removeManager
    );

    const navigate = useNavigate();

    function handleEdit(manager: Manager) {
        navigate(
            `/managers/edit/${manager.managerID}`
        );
    }

    function handleDelete(manager: Manager) {
        removeManager(manager.managerID);
    }

    return (
        <>
            {managersList.map(manager => (
                <ManagerCard
                    key={manager.managerID}
                    manager={manager}
                    onDelete={handleDelete}
                />
            ))}

            <Link to="/managers/new">
                Add Manager
            </Link>
        </>
    );
}