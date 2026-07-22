import { useState } from "react";
import { Manager } from "../types/types";
import { managers } from "../data/database";
import ManagerCard from "./components/ManagerCard";


export function ManagersPage() {
    const handleSelectManager = (selectedManager: Manager): void => {
        setManagerList(prev =>
            prev.filter(manager => manager.managerID !== selectedManager.managerID)
        );
    };   
    const [managerList, setManagerList] = useState(managers);
    
    return (
        <>
            {managerList.map(manager => (
                <ManagerCard
                    key={manager.managerID}
                    manager={manager}
                    onSelect={handleSelectManager}
                />
            ))}
        </>
    );
} export default ManagersPage