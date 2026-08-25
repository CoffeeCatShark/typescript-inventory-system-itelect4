import { Link } from "react-router-dom";
import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import ManagerCard from "./components/ManagerCard";

import type { Manager } from "../types/types";

import {
    getManagers,
    deleteManager
} from "../api/client";

export default function ManagersPage() {

    const queryClient = useQueryClient();

    const {
        data: managersList = [],
        isLoading,
        error
    } = useQuery({
        queryKey: ["managers"],
        queryFn: getManagers
    });

    const removeManager = useMutation({
        mutationFn: deleteManager,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["managers"]
            });
        }
    });

    function handleDelete(manager: Manager) {
        removeManager.mutate(manager.managerID);
    }

    if (isLoading) {
        return <p>Loading managers...</p>;
    }

    if (error) {
        return (
            <p>
                Could not reach the API. Make sure
                `npm run api` is running on port 3001.
            </p>
        );
    }

    return (
        <>
            <h2>Managers</h2>

            {managersList.map(manager => (
                <ManagerCard
                    key={manager.managerID}
                    manager={manager}
                    onDelete={handleDelete}
                />
            ))}

            <Link to="/managers/new">
                Add New Manager
            </Link>
        </>
    );
}
