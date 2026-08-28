import { z } from "zod";
import { SupplierType } from "../types/types";

export const supplierSchema = z.object({
    supplier_name: z
        .string()
        .trim()
        .min(
            2,
            "Supplier name must be at least 2 characters."
        ),

    type:
        z.nativeEnum(SupplierType)
});

export type SupplierFormData =
    z.infer<typeof supplierSchema>;