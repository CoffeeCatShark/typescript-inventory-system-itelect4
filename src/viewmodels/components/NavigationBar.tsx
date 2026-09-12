import { Link } from "react-router-dom";
import { useCurrentUser } from "@/data/store";

export default function NavigationBar() {
    const isAdmin = useCurrentUser((state) => state.isAdmin);
    const isManager = useCurrentUser((state) => state.isManager);

    return (
        <nav className="flex items-center gap-4 p-4">


            {/* Supplier AND Manager */}
            <Link
                to="/items"
                className="rounded-md px-4 py-2 font-medium"
            >
                ITEMS
            </Link>

            {/* Managers only */}
            {isManager && (
                <Link
                    to="/suppliers"
                    className="rounded-md px-4 py-2 font-medium"
                >
                    SUPPLIERS
                </Link>
            )}

            {/* Admin managers only */}
            {isManager && isAdmin && (
                <Link
                    to="/managers"
                    className="rounded-md px-4 py-2 font-medium"
                >
                    MANAGERS
                </Link>
            )}

        </nav>
    );
}
