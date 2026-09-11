import { useCurrentUser } from "@/data/store";
import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useMutation,
    useQuery,
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
    getSuppliers,
    createItem
} from "@/api/client";

import {
    itemSchema,
    type ItemFormData
} from "@/schema/itemSchema";
import { SupplierType } from "@/types/types";


export default function AddItemPage() {

    const navigate = useNavigate();

    const queryClient =
        useQueryClient();


    const {
        data: supplierList = [],
        isLoading,
        error
    } = useQuery({
        queryKey: ["suppliers"],
        queryFn: getSuppliers
    });


    const createMutation =
        useMutation({
            mutationFn: createItem,

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: ["items"]
                });

                navigate("/items");
            }
        });


    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<ItemFormData>({
        resolver:
            zodResolver(itemSchema),

        defaultValues: {
            itemName: "",
            supplierID: 0,
            supplierPrice: 0,
            deliveredQuantity: 0,
            itemType: SupplierType.Appliances
        }
    });


    function onSubmit(
        data: ItemFormData
    ) {

        createMutation.mutate(data);
    }


    if (isLoading) {
        return <p>Loading suppliers...</p>;
    }


    if (error) {
        return (
            <p>
                Failed to load suppliers.
            </p>
        );
    }


    return (
        <div className="mx-auto w-full max-w-4xl p-6">

            <h2>Add Item</h2>

            <form
                onSubmit={
                    handleSubmit(onSubmit)
                }
            >

                <div>

                    <Label htmlFor="itemName">
                        Item Name
                    </Label>

                    <Input
                        id="itemName"
                        {...register("itemName")}
                    />

                    {errors.itemName && (
                        <p>
                            {
                                errors
                                    .itemName
                                    .message
                            }
                        </p>
                    )}

                </div>


                <div>

                    <Label htmlFor="supplierPrice">
                        Price
                    </Label>

                    <Input
                        id="supplierPrice"
                        type="number"
                        step="0.01"
                        {...register(
                            "supplierPrice",
                            {
                                valueAsNumber:
                                    true
                            }
                        )}
                    />

                    {errors.supplierPrice && (
                        <p>
                            {
                                errors
                                    .supplierPrice
                                    .message
                            }
                        </p>
                    )}

                </div>


                <div>

                    <Label htmlFor="deliveredQuantity">
                        Quantity
                    </Label>

                    <Input
                        id="deliveredQuantity"
                        type="number"
                        {...register(
                            "deliveredQuantity",
                            {
                                valueAsNumber:
                                    true
                            }
                        )}
                    />

                    {errors.deliveredQuantity && (
                        <p>
                            {
                                errors
                                    .deliveredQuantity
                                    .message
                            }
                        </p>
                    )}

                </div>


                <div>

                    <Label htmlFor="supplierID">
                        Supplier
                    </Label>

                    <select
                        id="supplierID"
                        {...register(
                            "supplierID",
                            {
                                valueAsNumber:
                                    true
                            }
                        )}
                    >

                        <option value={0}>
                            Select Supplier
                        </option>

                        {supplierList.map(
                            supplier => (
                                <option
                                    key={
                                        supplier
                                            .supplierId
                                    }
                                    value={
                                        supplier
                                            .supplierId
                                    }
                                >
                                    {
                                        supplier
                                            .supplier_name
                                    }
                                </option>
                            )
                        )}

                    </select>

                    {errors.supplierID && (
                        <p>
                            {
                                errors
                                    .supplierID
                                    .message
                            }
                        </p>
                    )}

                </div>


                <div>

                    <Label htmlFor="itemType">
                        Item Type
                    </Label>

                    <select
                        id="itemType"
                        {...register("itemType")}
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

                    {errors.itemType && (
                        <p>
                            {
                                errors
                                    .itemType
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
                            : "Add Item"
                    }
                </Button>

            </form>

            <br />

            <Link to="/items">
                Back to Items
            </Link>

        </div>
    );
}