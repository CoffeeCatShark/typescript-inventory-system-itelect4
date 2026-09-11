import { useCurrentUser } from "@/data/store";
import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import {
    useForm
} from "react-hook-form";

import {
    zodResolver
} from "@hookform/resolvers/zod";

import {
    Button
} from "@/components/ui/button";

import {
    Input
} from "@/components/ui/input";

import {
    Label
} from "@/components/ui/label";

import {
    createManager
} from "@/api/client";

import {
    managerSchema,
    type ManagerFormData
} from "@/schema/managerSchema";
import { AuthorizationLvl } from "@/types/types";


export default function AddManagerPage() {

    const navigate = useNavigate();

    const queryClient =
        useQueryClient();


    const createMutation =
        useMutation({
            mutationFn: createManager,

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: ["managers"]
                });

                navigate("/managers");
            }
        });


    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<ManagerFormData>({
        resolver:
            zodResolver(managerSchema),

        defaultValues: {
            managerName: "",
            authLevel: AuthorizationLvl.Pending
        }
    });


    function onSubmit(
        data: ManagerFormData
    ) {

        createMutation.mutate(data);
    }


    return (
        <div className="mx-auto w-full max-w-4xl p-6">

            <h2>Add Manager</h2>

            <form
                onSubmit={
                    handleSubmit(onSubmit)
                }
            >

                <div>

                    <Label htmlFor="managerName">
                        Manager Name
                    </Label>

                    <Input
                        id="managerName"
                        {...register(
                            "managerName"
                        )}
                    />

                    {errors.managerName && (
                        <p>
                            {
                                errors
                                    .managerName
                                    .message
                            }
                        </p>
                    )}

                </div>


                <div>

                    <Label htmlFor="authLevel">
                        Authorization Level
                    </Label>

                    <select
                        id="authLevel"
                        {...register(
                            "authLevel"
                        )}
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

                    {errors.authLevel && (
                        <p>
                            {
                                errors
                                    .authLevel
                                    .message
                            }
                        </p>
                    )}

                </div>


                <Button
                    type="submit"
                     className="rounded-md px-4 py-2 font-medium shadow-sm transition hover:opacity-90"
                    disabled={
                        createMutation.isPending
                    }
                >
                    {
                        createMutation.isPending
                            ? "Adding..."
                            : "Add Manager"
                    }
                </Button>

            </form>

            <br />

            <Link to="/managers">
                Back to Managers
            </Link>

        </div>
    );
}