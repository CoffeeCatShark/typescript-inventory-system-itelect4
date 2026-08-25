import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import { AuthorizationLvl } from "../types/types";
import type { CreateManager } from "../api/types";

import { createManager } from "../api/client";

export default function AddManagerPage() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const addManager = useMutation({
        mutationFn: createManager,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["managers"]
            });
            navigate("/managers");
        }
    });

    const [managerName, setManagerName] = useState<string>("");

    const [authLevel, setAuthLevel] =
        useState<AuthorizationLvl>(
            AuthorizationLvl.Pending
        );

    function AddNewManager() {

        const newManager: CreateManager = {
            managerName: managerName,
            authLevel: authLevel
        };

        addManager.mutate(newManager);
    }

    return (
        <>
            <h2>Add New Manager</h2>

            <input
                type="text"
                placeholder="Manager Name"
                value={managerName}
                onChange={e =>
                    setManagerName(e.target.value)
                }
            />

            <select
                value={authLevel}
                onChange={e =>
                    setAuthLevel(
                        e.target.value as AuthorizationLvl
                    )
                }
            >
                <option value={AuthorizationLvl.High}>
                    High
                </option>

                <option value={AuthorizationLvl.Low}>
                    Low
                </option>

                <option value={AuthorizationLvl.Pending}>
                    Pending
                </option>
            </select>

            <button
                onClick={AddNewManager}
                disabled={addManager.isPending}
            >
                {addManager.isPending ? "Adding..." : "Add Manager"}
            </button>

            <br />

            <Link to="/managers">
                Back to Managers
            </Link>
        </>
    );
}
