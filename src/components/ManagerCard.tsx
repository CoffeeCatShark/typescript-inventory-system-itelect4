import type { Manager } from "../types/index"

interface ManagerCardProps {
    manager: Manager
}

function ManagerCard({manager}: ManagerCardProps) {
    return (
        <div className="manager-card">
            <h3>Manager Name: {manager.name}</h3>
            <h3>Authorization Level: {manager.authLevel}</h3>
        </div>
    )
};
export default ManagerCard