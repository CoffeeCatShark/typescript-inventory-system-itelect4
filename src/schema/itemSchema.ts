import { z } from "zod";
import { SupplierType } from "../types/types";

export const itemSchema = z
    .object({
        itemName: z
            .string()
            .trim()
            .min(
                2,
                "Item name must be at least 2 characters."
            ),

        supplierID: z
            .number()
            .int()
            .positive(
                "Please select a supplier."
            ),

        supplierPrice: z
            .number()
            .positive(
                "Price must be greater than 0."
            ),

        deliveredQuantity: z
            .number()
            .int()
            .positive(
                "Quantity must be at least 1."
            ),

        itemType: z.nativeEnum(SupplierType)
    })
    .refine(
        data =>
            data.supplierPrice *
            data.deliveredQuantity <=
            1000000,
        {
            message:
                "Total item value cannot exceed 1,000,000.",
            path: ["supplierPrice"]
        }
    );

export type ItemFormData =
    z.infer<typeof itemSchema>;