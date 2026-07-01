import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { getActivityLogs } from "../services/taskService";
import { useAuth } from "../context/AuthContext";

const ActivityLogs = () => {
    const { user } = useAuth();
    const [logs, setLogs] = useState([]);
    

    useEffect(() => {

        loadLogs();

    }, []);

    const loadLogs = async () => {

        try {

            const data = await getActivityLogs();

            setLogs(data);

        } catch (error) {

            console.log(error);

        }

    };
    if (!user) {
        return null;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }
    return (

        <>
            <Navbar />

            <div className="container">

                <Sidebar />

                <div className="main">

                    <h2 className="page-title">

                        Activity Logs

                    </h2>

                    <table className="activity-table">

                        <thead>

                            <tr>

                                <th>User</th>

                                <th>Action</th>

                                <th>Task ID</th>

                                <th>Time</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                logs.map(log => (

                                    <tr key={log.log_id}>

                                        <td>

                                            {log.user_name}

                                        </td>

                                        <td>

                                            {log.action}

                                        </td>

                                        <td>

                                            {log.task_id || "-"}

                                        </td>

                                        <td>

                                            {

                                                new Date(
                                                    log.timestamp
                                                ).toLocaleString()

                                            }

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

};

export default ActivityLogs;