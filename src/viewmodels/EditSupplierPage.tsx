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
    getSupplier,
    updateSupplier
} from "@/api/client";

import {
    supplierSchema,
    type SupplierFormData
} from "@/schema/supplierSchema";

import {
    SupplierType
} from "../types/types";


export default function EditSupplierPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const queryClient =
        useQueryClient();

    const supplierId =
        Number(id);


    // ========================================================
    // GET SUPPLIER
    // ========================================================

    const {
        data: supplier,
        isLoading,
        error
    } = useQuery({
        queryKey: [
            "suppliers",
            supplierId
        ],

        queryFn: () =>
            getSupplier(supplierId),

        enabled:
            !Number.isNaN(
                supplierId
            )
    });


    // ========================================================
    // UPDATE MUTATION
    // ========================================================

    const updateMutation =
        useMutation({
            mutationFn: updateSupplier,

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: ["suppliers"]
                });

                navigate("/suppliers");
            }
        });


    // ========================================================
    // FORM
    // ========================================================

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<SupplierFormData>({
        resolver:
            zodResolver(
                supplierSchema
            ),

        values: supplier
            ? {
                supplier_name:
                    supplier.supplier_name,

                type:
                    supplier.type
            }
            : undefined
    });


    // ========================================================
    // LOADING
    // ========================================================

    if (isLoading) {
        return (
            <p>
                Loading supplier...
            </p>
        );
    }


    // ========================================================
    // ERROR
    // ========================================================

    if (
        error ||
        !supplier
    ) {
        return (
            <div>

                <h2>
                    Supplier not found.
                </h2>

                <Link to="/suppliers">
                    Back to Suppliers
                </Link>

            </div>
        );
    }


    // ========================================================
    // SAVE
    // ========================================================

    const existingSupplierID =
        supplier.supplierId;

    const existingDeliveryBoxID =
        supplier.deliveryBoxID;


    function onSubmit(
        data: SupplierFormData
    ) {

        updateMutation.mutate({

            supplierId:
                existingSupplierID,

            supplier_name:
                data.supplier_name,

            type:
                data.type,

            deliveryBoxID:
                existingDeliveryBoxID
        });
    }


    // ========================================================
    // PAGE
    // ========================================================

    return (
        <div className="mx-auto w-full max-w-4xl p-6">

            <h2>
                Edit Supplier
            </h2>


            <form
                onSubmit={
                    handleSubmit(
                        onSubmit
                    )
                }
            >

                {/* ==========================================
                    SUPPLIER NAME
                ========================================== */}

                <div>

                    <Label
                        htmlFor="supplier_name"
                    >
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


                {/* ==========================================
                    SUPPLIER TYPE
                ========================================== */}

                <div>

                    <Label
                        htmlFor="type"
                    >
                        Supplier Type
                    </Label>

                    <select
                        id="type"
                        {...register("type")}
                    >

                        <option
                            value={
                                SupplierType.Appliances
                            }
                        >
                            Appliances
                        </option>

                        <option
                            value={
                                SupplierType.Furnitures
                            }
                        >
                            Furnitures
                        </option>

                        <option
                            value={
                                SupplierType.Tools
                            }
                        >
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


                {/* ==========================================
                    SUBMIT
                ========================================== */}

                <Button
                    type="submit"
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


            {/* ==============================================
                CANCEL
            ============================================== */}

            <Link to="/suppliers">
                Cancel
            </Link>

        </div>
    );
}