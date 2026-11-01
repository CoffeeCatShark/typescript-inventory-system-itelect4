import type { Manager } from "@/types/types";
import { AuthorizationLvl } from "@/types/types";

export const demoManagers: Manager[] = [
    {
        id: "manager-001",
        managerName: "Admin",
        authLevel: AuthorizationLvl.High
    },
    {
        id: "manager-002",
        managerName: "Inventory Manager",
        authLevel: AuthorizationLvl.Low
    }
];