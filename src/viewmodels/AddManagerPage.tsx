import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { create } from "@/api/client";
import { AuthorizationLvl, type Manager } from "@/types/types";

export default function AddManagerPage() {
    const navigate = useNavigate();

    const [managerName, setManagerName] = useState("");
    const [authorizationLvl, setAuthorizationLvl] = useState(
        AuthorizationLvl.Pending
    );

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        const newManager: Omit<Manager, "id"> = {
            managerName: managerName,
            authLevel: authorizationLvl
        };

        await create<Omit<Manager, "id">, Manager>(
            "managers",
            newManager
        );

        navigate("/managers");
    }

    return (
        <div className="mx-auto w-full max-w-2xl p-6">

            <h1 className="mb-6 text-3xl font-bold">
                Add Manager
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <div>
                    <label className="mb-1 block font-medium">
                        Manager Name
                    </label>

                    <input
                        type="text"
                        value={managerName}
                        onChange={(event) =>
                            setManagerName(event.target.value)
                        }
                        className="w-full rounded-md border px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1 block font-medium">
                        Authorization Level
                    </label>

                    <select
                        value={authorizationLvl}
                        onChange={(event) =>
                            setAuthorizationLvl(
                                event.target.value as AuthorizationLvl
                            )
                        }
                        className="w-full rounded-md border px-3 py-2"
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
                </div>

                <div className="flex gap-2 pt-4">

                    <button
                        type="submit"
                        className="rounded-md px-4 py-2 font-medium shadow-sm transition hover:opacity-90"
                    >
                        ADD MANAGER
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/managers")}
                        className="rounded-md px-4 py-2 font-medium shadow-sm transition hover:opacity-90"
                    >
                        CANCEL
                    </button>

                </div>

            </form>

        </div>
    );
}
