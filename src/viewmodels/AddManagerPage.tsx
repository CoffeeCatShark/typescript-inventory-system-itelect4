import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { Manager } from "../types/types";
import { AuthorizationLvl } from "../types/types";

import {
    globalID,
    incrementID
} from "../data/database";

import { useDataStore } from "../data/store";

export default function AddManagerPage() {

    const addManager = useDataStore(
        state => state.addManager
    );

    const [managerName, setManagerName] =
        useState("");

    const [authLevel, setAuthLevel] =
        useState(AuthorizationLvl.Pending);

    const navigate = useNavigate();

    function AddNewManager() {

        const newManager: Manager = {
            managerID: globalID,
            managerName: managerName,
            authLevel
        };

        addManager(newManager);

        incrementID();

        navigate("/managers");
    }

    return (
        <>
            <h2>Add Manager</h2>

            <input
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
                        parseInt(e.target.value, 10) as unknown as AuthorizationLvl
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

            <Link to="/managers">
                Back to Managers
            </Link>
        </>
    );
}