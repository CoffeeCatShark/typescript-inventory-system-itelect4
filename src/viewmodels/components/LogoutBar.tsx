import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/data/store";

export default function LogoutBar() {
    const navigate = useNavigate();
    const logout = useCurrentUser((state) => state.logout);

    function handleLogout() {
        logout();
        navigate("/main");
    }

    return (
        <div className="fixed bottom-0 right-0 p-4">
            <button
                onClick={handleLogout}
                className="rounded-md px-4 py-2 font-medium shadow-md transition hover:opacity-90"
            >
                LOGOUT
            </button>
        </div>
    );
}
