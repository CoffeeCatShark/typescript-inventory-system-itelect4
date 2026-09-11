import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getManagers, getSuppliers } from "@/api/client";
import { useCurrentUser } from "@/data/store";

import { Button } from "@/components/ui/button";

function AccountPage() {

    const navigate = useNavigate();

    const setUserID = useCurrentUser((state) => state.setUserID);
    const setPrivileges = useCurrentUser((state) => state.setPrivileges);
    const setUserType = useCurrentUser((state) => state.setUserType);   
    
    const handleLogin = (userID:number, priveleges:boolean, userType:boolean) => {
    setUserID(userID);
    setPrivileges(priveleges);
    setUserType(userType);
    }




    //const setCurrentUser = useCurrentUser(
    //    state => state.
    //);

    const { data: managers, isLoading: managersLoading } =
        useQuery({
            queryKey: ["managers"],
            queryFn: getManagers
        });

    const { data: suppliers, isLoading: suppliersLoading } =
        useQuery({
            queryKey: ["suppliers"],
            queryFn: getSuppliers
        });


    const selectManager = (
        manager: Awaited<ReturnType<typeof getManagers>>[number]
    ) => {

        handleLogin(manager.managerID,true,true)

        navigate("/inventory");
    };


    const selectSupplier = (
        supplier: Awaited<ReturnType<typeof getSuppliers>>[number]
    ) => {

        handleLogin(supplier.supplierId,false,false)

        navigate("/inventory");
    };


    if (managersLoading || suppliersLoading) {
        return <p>Loading accounts...</p>;
    }


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

                    {managers?.map(manager => (

                        <Button
                            key={manager.managerID}
                            variant="outline"
                            className="h-auto justify-between p-4"
                            onClick={() =>
                                selectManager(manager)
                            }
                        >

                            <span>
                                {manager.managerName}
                            </span>

                            <span>
                                {manager.authLevel}
                            </span>

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

                    {suppliers?.map(supplier => (

                        <Button
                            key={supplier.supplierId}
                            variant="outline"
                            className="h-auto justify-between p-4"
                            onClick={() =>
                                selectSupplier(supplier)
                            }
                        >

                            <span>
                                {supplier.supplier_name}
                            </span>

                            <span>
                                Supplier
                            </span>

                        </Button>

                    ))}

                </div>

            </section>

        </div>
    );
}

export default AccountPage;