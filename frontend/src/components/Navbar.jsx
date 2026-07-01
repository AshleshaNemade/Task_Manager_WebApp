import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {

        logout();
        navigate("/login");

    };

    return (

        <nav className="navbar">

            <h2>Task Manager</h2>

            <div className="nav-right">

                <span>
                    Welcome, {user?.name}
                </span>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </nav>

    );

};

export default Navbar;