import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { Manager } from "../types/types";
import { AuthorizationLvl } from "../types/types";

import { globalID, incrementID } from "../data/database";
import { useDataStore } from "../data/store";

export default function AddManagerPage() {

    const navigate = useNavigate();

    const addManager = useDataStore(
        state => state.addManager
    );

    const [managerName, setManagerName] = useState<string>("");

    const [authLevel, setAuthLevel] =
        useState<AuthorizationLvl>(
            AuthorizationLvl.Pending
        );

    function AddNewManager() {

        const newManager: Manager = {
            managerID: globalID,
            managerName: managerName,
            authLevel: authLevel
        };

        addManager(newManager);

        incrementID();

        navigate("/managers");
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

            <button onClick={AddNewManager}>
                Add Manager
            </button>

            <br />

            <Link to="/managers">
                Back to Managers
            </Link>
        </>
    );
}