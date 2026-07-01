import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

import { createTask } from "../services/taskService";
import { getUsers } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const CreateTask = () => {

    const navigate = useNavigate();
    const { user: currentUser } = useAuth();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assignedUsers: []
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const data = await getUsers();

            // Don't show logged-in user because
            // creator is automatically assigned
            setUsers(
                data.filter(
                    user => user.user_id !== currentUser.id
                )
            );

        } catch (err) {

            console.error(err);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleAssign = (userId) => {

        setFormData(prev => {

            const exists = prev.assignedUsers.includes(userId);

            if (exists) {

                return {
                    ...prev,
                    assignedUsers: prev.assignedUsers.filter(
                        id => id !== userId
                    )
                };

            }

            return {
                ...prev,
                assignedUsers: [
                    ...prev.assignedUsers,
                    userId
                ]
            };

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {

            await createTask(formData);

            setMessage("Task created successfully.");

            setTimeout(() => {

                navigate("/");

            }, 1200);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to create task."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <>
            <Navbar />

            <div className="container">

                <Sidebar />

                <div className="main">

                    <h2 className="page-title">
                        Create Task
                    </h2>

                    <Alert
                        type="success"
                        message={message}
                        onClose={() => setMessage("")}
                    />

                    <Alert
                        type="error"
                        message={error}
                        onClose={() => setError("")}
                    />

                    <form
                        className="task-form"
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="text"
                            name="title"
                            placeholder="Task Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            rows="5"
                            name="description"
                            placeholder="Task Description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <label>

                            Assign Users

                        </label>

                        <div className="user-checkboxes">

                            {

                                users.length === 0 ?

                                <p>No users available.</p>

                                :

                                users.map(user => (

                                    <label
                                        key={user.user_id}
                                        className="checkbox-item"
                                    >

                                        <input
                                            type="checkbox"
                                            checked={formData.assignedUsers.includes(user.user_id)}
                                            onChange={() => handleAssign(user.user_id)}
                                        />

                                        {user.name}

                                    </label>

                                ))

                            }

                        </div>

                        {

                            loading ?

                            <Loader />

                            :

                            <button type="submit">

                                Create Task

                            </button>

                        }

                    </form>

                </div>

            </div>

        </>

    );

};

export default CreateTask;