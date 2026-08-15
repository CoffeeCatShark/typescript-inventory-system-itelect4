import type { Manager } from "../../types/types";

interface ManagerCardProps {
    manager: Manager;
    onDelete: (manager: Manager) => void;
}

function ManagerCard({
    manager,
    onDelete
}: ManagerCardProps) {

    return (
        <div className="manager-card">

            <h3>
                Manager: {manager.managerName}
            </h3>

            <p>
                Authorization Level: {manager.authLevel}
            </p>

            <button
                onClick={() => onDelete(manager)}
            >
                DELETE
            </button>

        </div>
    );
}

export default ManagerCard;