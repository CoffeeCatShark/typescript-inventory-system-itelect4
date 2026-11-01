
import { useNavigate } from "react-router-dom";
import { remove } from "@/api/client";
import ManagerCard from "@/viewmodels/components/ManagerCard";
import { Manager } from "@/types/types";
import { demoManagers } from "@/data/demoManagers";

export default function ManagersPage() {

    async function handleDelete(manager: Manager) {
        await remove(`managers/${manager.id}`);
    }
const navigate = useNavigate();

const managers = demoManagers;

    return (
        <div className="mx-auto w-full max-w-5xl p-6">
                <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Managers
                </h1>

                <button
                    className="rounded-md px-4 py-2 font-medium shadow-sm transition hover:opacity-90"
                    onClick={() => navigate("/managers/new")}
                >
                    ADD MANAGER
                </button>
            </div>

            <div className="grid gap-4">

                {(managers ?? []).map((manager) => (
                    <ManagerCard
                        key={manager.id}
                        manager={manager}
                        onDelete={(manager) => {handleDelete(manager)}}
                    />
                ))}

            </div>

        </div>
    );
}