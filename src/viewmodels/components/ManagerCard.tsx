import type { Manager } from "../../types/types"

interface ManagerCardProps {
    manager: Manager
    onSelect: (manager: Manager) => void;
}

function ManagerCard({onSelect, manager}: ManagerCardProps) {
    const handleClick = (): void => {
    onSelect(manager);
};


    return (
        <div className="manager-card">
            <h3>{manager.name}</h3>
            <button onClick={handleClick}>Close</button>
        </div>
    )
};
export default ManagerCard


