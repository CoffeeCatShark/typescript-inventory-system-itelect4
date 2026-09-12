import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "@/data/store";

export default function UserCard() {
    const navigate = useNavigate();

    const userID = useCurrentUser((state) => state.userID);
    const logout = useCurrentUser((state) => state.logout);
    const userName = useCurrentUser((state) => state.userName)
    const isManager = useCurrentUser((state) => state.isManager)

    function handleLogout() {
        logout();
        navigate("/main");
    }

    return (
        <div className="fixed top-0 right-0 p-4">
            <div>
              <p>{userName}</p>

            {userID && (
                isManager ? (
                    <p>Manager</p>
                ) : (
                    <p>Supplier</p>
                )
            )}
                
                
                
                <button
                    onClick={handleLogout}
                    className="rounded-md px-4 py-2 font-medium shadow-md"
                >
                    LOGOUT
                </button>
            </div>
        </div>
    );
}