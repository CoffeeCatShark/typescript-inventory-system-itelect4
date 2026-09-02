import {
    Link,
    useNavigate,
    useParams
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
    getItem,
    getSuppliers,
    updateItem
} from "@/api/client";

import {
    itemSchema,
    type ItemFormData
} from "@/schema/itemSchema";


export default function EditItemPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const queryClient =
        useQueryClient();


    const itemID = Number(id);


    const {
        data: item,
        isLoading: itemLoading,
        error: itemError
    } = useQuery({
        queryKey: ["items", itemID],
        queryFn: () => getItem(itemID),
        enabled: !Number.isNaN(itemID)
    });


    const {
        data: supplierList = [],
        isLoading: suppliersLoading
    } = useQuery({
        queryKey: ["suppliers"],
        queryFn: getSuppliers
    });


    const updateMutation =
        useMutation({
            mutationFn: updateItem,

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

        values: item
            ? {
                itemName:
                    item.itemName,

                supplierID:
                    item.supplierID,

                supplierPrice:
                    item.supplierPrice,

                deliveredQuantity:
                    item.deliveredQuantity,

                itemType:
                    item.itemType
            }
            : undefined
    });


    if (
        itemLoading ||
        suppliersLoading
    ) {
        return <p>Loading...</p>;
    }


    if (
        itemError ||
        !item
    ) {
        return (
            <p>
                Item not found.
            </p>
        );
    }


   const existingItemID = item.itemID;

function onSubmit(data: ItemFormData) {

    updateMutation.mutate({
        itemID: existingItemID,
        itemName: data.itemName,
        supplierID: data.supplierID,
        supplierPrice: data.supplierPrice,
        itemType: data.itemType,
        deliveredQuantity: data.deliveredQuantity
    });
}


    return (
        <div className="mx-auto w-full max-w-4xl p-6">

            <h2>Edit Item</h2>

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

                        <option value="Appliances">
                            Appliances
                        </option>

                        <option value="Furnitures">
                            Furnitures
                        </option>

                        <option value="Tools">
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
                        updateMutation.isPending
                    }
                >
                    {
                        updateMutation.isPending
                            ? "Saving..."
                            : "Save Changes"
                    }
                </Button>

            </form>

            <br />

            <Link to="/items">
                Cancel
            </Link>

        </div>
    );
}