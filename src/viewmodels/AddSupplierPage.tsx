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
    createSupplier,
    createDeliveryBox
} from "@/api/client";

import {
    supplierSchema,
    type SupplierFormData
} from "@/schema/supplierSchema";
import { SupplierType } from "@/types/types";


export default function AddSupplierPage() {

    const navigate = useNavigate();

    const queryClient =
        useQueryClient();


    const createSupplierMutation =
        useMutation({
            mutationFn: createSupplier,

            onSuccess: async supplier => {

                await createDeliveryBox({
                    ownerID:
                        supplier.supplierId,

                    itemsID: []
                });

                queryClient.invalidateQueries({
                    queryKey: ["suppliers"]
                });

                queryClient.invalidateQueries({
                    queryKey: ["deliveryBoxes"]
                });

                navigate("/suppliers");
            }
        });


    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<SupplierFormData>({
        resolver:
            zodResolver(supplierSchema),

        defaultValues: {
            supplier_name: "",
            type: SupplierType.Appliances
        }
    });


    function onSubmit(
        data: SupplierFormData
    ) {

        createSupplierMutation.mutate(data);
    }


    return (
        <div>

            <h2>Add Supplier</h2>

            <form
                onSubmit={
                    handleSubmit(onSubmit)
                }
            >

                <div>

                    <Label htmlFor="supplier_name">
                        Supplier Name
                    </Label>

                    <Input
                        id="supplier_name"
                        {...register(
                            "supplier_name"
                        )}
                    />

                    {errors.supplier_name && (
                        <p>
                            {
                                errors
                                    .supplier_name
                                    .message
                            }
                        </p>
                    )}

                </div>


                <div>

                    <Label htmlFor="type">
                        Supplier Type
                    </Label>

                    <select
                        id="type"
                        {...register("type")}
                    >

                            <option value={SupplierType.Appliances}>
                                Appliances
                            </option>

                            <option value={SupplierType.Furnitures}>
                                Furnitures
                            </option>

                            <option value={SupplierType.Tools}>
                                Tools
                            </option>


                    </select>

                    {errors.type && (
                        <p>
                            {
                                errors
                                    .type
                                    .message
                            }
                        </p>
                    )}

                </div>


                <Button
                    type="submit"
                    disabled={
                        createSupplierMutation
                            .isPending
                    }
                >
                    {
                        createSupplierMutation
                            .isPending
                            ? "Adding..."
                            : "Add Supplier"
                    }
                </Button>

            </form>

            <br />

            <Link to="/suppliers">
                Back to Suppliers
            </Link>

        </div>
    );
}