import { Manager } from '../types/types';
import ManagerCard from "./components/ManagerCard";
import {remove} from "../data/helpers"
import { Link } from "react-router-dom";
interface ManagerPageProps{
        managersList: Manager[],
        setManagersList: React.Dispatch<React.SetStateAction<Manager[]>>;
    }

export function ManagersPage({
    managersList,setManagersList
}:ManagerPageProps) {
    
    const handleSelectManager = (selectedManager: Manager): void => {
            remove(managersList, "managerID", selectedManager.managerID);


        
        setManagersList([...managersList])
    }


    return (
        <>
            {managersList.map(manager => (
                <ManagerCard
                    key={manager.managerID}
                    manager={manager}
                    onSelect={handleSelectManager}
                />
            ))}

            <Link to="/managers/new">
                Add Managers
            </Link>

        </>
    );
} export default ManagersPage