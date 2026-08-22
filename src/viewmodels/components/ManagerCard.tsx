import type { Manager } from "../../types/types";

interface ManagerCardProps {

    manager: Manager;

    onDelete: (manager: Manager) => void;
}


export default function ManagerCard({
    manager,
    onDelete
}: ManagerCardProps) {

    return (
        <div className="manager-card">

            <h3>
                Manager:
                {" "}
                {manager.managerName}
            </h3>

            <p>
                Manager ID:
                {" "}
                {manager.managerID}
            </p>

            <p>
                Authorization:
                {" "}
                {manager.authLevel}
            </p>


            <button
                onClick={() => onDelete(manager)}
            >
                DELETE
            </button>

        </div>
    );
}