import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {

    const { user } = useAuth();

    return (

        <div className="sidebar">

            <Link to="/">
                Dashboard
            </Link>

            <Link to="/create-task">
                Create Task
            </Link>

            {user?.role === "admin" && (

                <Link to="/activity">
                    Activity Logs
                </Link>

            )}

        </div>

    );

};

export default Sidebar;