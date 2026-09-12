import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { list } from "@/api/client";
import ManagerCard from "@/viewmodels/components/ManagerCard";

export default function ManagersPage() {
const navigate = useNavigate();
    const {
        data: managers,
        isLoading,
        isError
    } = useQuery({
        queryKey: ["managers"],
        queryFn: () => list("managers")
    });

    if (isLoading) {
        return <p>Loading managers...</p>;
    }

    if (isError) {
        return <p>Failed to load managers.</p>;
    }

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
                        onDelete={() => {}}
                    />
                ))}

            </div>

        </div>
    );
}