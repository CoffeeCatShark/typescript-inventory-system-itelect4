import { useQuery } from "@tanstack/react-query";

import { list } from "@/api/client";
import ManagerCard from "@/viewmodels/components/ManagerCard";

export default function ManagersPage() {

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

            <h1 className="mb-6 text-3xl font-bold">
                Managers
            </h1>

            <div className="grid gap-4">

                {(managers ?? []).map((manager) => (
                    <ManagerCard
                        key={manager.managerID}
                        manager={manager}
                        onDelete={() => {}}
                    />
                ))}

            </div>

        </div>
    );
}