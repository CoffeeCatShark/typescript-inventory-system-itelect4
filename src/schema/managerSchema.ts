import { z } from "zod";
import { AuthorizationLvl } from "../types/types";

export const managerSchema = z.object({
    managerName: z
        .string()
        .trim()
        .min(
            2,
            "Manager name must be at least 2 characters."
        ),

    authLevel:
        z.nativeEnum(AuthorizationLvl)
});

export type ManagerFormData =
    z.infer<typeof managerSchema>;