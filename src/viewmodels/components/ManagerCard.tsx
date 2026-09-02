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
             className="rounded-md px-4 py-2 font-medium shadow-sm transition hover:opacity-90"
                onClick={() => onDelete(manager)}
            >
                DELETE
            </button>

        </div>
    );
}