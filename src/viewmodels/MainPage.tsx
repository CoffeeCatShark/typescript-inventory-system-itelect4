import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { list } from "@/api/client";
import { useCurrentUser } from "@/data/store";

import { Button } from "@/components/ui/button";
import type { Manager, Supplier } from "@/types/types";

function AccountPage() {

    const navigate = useNavigate();

    const setUserID = useCurrentUser(
        (state) => state.setUserID
    );

    const setPrivileges = useCurrentUser(
        (state) => state.setPrivileges
    );

    const setUserType = useCurrentUser(
        (state) => state.setUserType
    );


    // ============================================================
    // LOGIN
    // ============================================================

    const handleLogin = (
        userID: string,
        privileges: boolean,
        userType: boolean
    ) => {

        setUserID(userID);
        setPrivileges(privileges);
        setUserType(userType);

        navigate("/inventory");
    };


    // ============================================================
    // MANAGERS
    // ============================================================

    const {
        data: managers,
        isLoading: managersLoading,
        isError: managersError
    } = useQuery({
        queryKey: ["managers"],
        queryFn: () => list("managers")
    });


    // ============================================================
    // SUPPLIERS
    // ============================================================

    const {
        data: suppliers,
        isLoading: suppliersLoading,
        isError: suppliersError
    } = useQuery({
        queryKey: ["suppliers"],
        queryFn: () => list("suppliers")
    });


    // ============================================================
    // LOADING
    // ============================================================

    if (managersLoading || suppliersLoading) {
        return <p>Loading accounts...</p>;
    }


    // ============================================================
    // ERROR
    // ============================================================

    if (managersError || suppliersError) {
        return <p>Failed to load accounts.</p>;
    }


    // ============================================================
    // SELECT MANAGER
    // ============================================================

    const selectManager = (manager: Manager) => {

        handleLogin(manager.id, true, true);
         navigate("/main");
        
    };


    // ============================================================
    // SELECT SUPPLIER
    // ============================================================

    const selectSupplier = (supplier: Supplier) => {

        handleLogin(supplier.id, false, false);
        navigate ("/items")
    };


    // ============================================================
    // UI
    // ============================================================

    return (
        <div className="mx-auto w-full max-w-4xl p-6">

            <h1 className="mb-8 text-3xl font-bold">
                Select an Account
            </h1>


            {/* ==================== */}
            {/* MANAGERS */}
            {/* ==================== */}

            <section className="mb-10">

                <h2 className="mb-4 text-xl font-semibold">
                    Managers
                </h2>

                <div className="grid gap-4">

                    {(managers ?? []).map((manager) => (
                    <Button
                        key={manager.id}
                        onClick={() => selectManager(manager)}
                    >
                        <span>{manager.managerName}</span>
                        <span>{manager.authLevel}</span>
                    </Button>
                ))}

                </div>

            </section>


            {/* ==================== */}
            {/* SUPPLIERS */}
            {/* ==================== */}

            <section>

                <h2 className="mb-4 text-xl font-semibold">
                    Suppliers
                </h2>

                <div className="grid gap-4">

                    {(suppliers ?? []).map((supplier) => (
                    <Button
                        key={supplier.id}
                        onClick={() => selectSupplier(supplier)}
                    >
                        <span>{supplier.supplier_name}</span>
                        <span>Supplier</span>
                    </Button>
                ))}

                </div>

            </section>

        </div>
    );
}

export default AccountPage;

