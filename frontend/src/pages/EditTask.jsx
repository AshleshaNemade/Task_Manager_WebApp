import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
    getTask,
    updateTask
} from "../services/taskService";

import { getUsers } from "../services/authService";

const EditTask = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "Pending",
        assignedUsers: []
    });

    useEffect(() => {

        loadTask();
        loadUsers();

    }, []);

    const loadTask = async () => {

        const task = await getTask(id);

        setFormData({
            title: task.title,
            description: task.description,
            status: task.status,
            assignedUsers: task.assignedUsers.map(
                user => user.user_id
            )
        });

    };

    const loadUsers = async () => {

        const data = await getUsers();

        setUsers(data);

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

        await updateTask(id, formData);

        navigate("/");

    };

    return (

        <>
            <Navbar />

            <div className="container">

                <Sidebar />

                <div className="main">

                    <h2>Edit Task</h2>

                    <form
                        className="task-form"
                        onSubmit={handleSubmit}
                    >

                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />

                        <textarea
                            rows="5"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >

                            <option>Pending</option>

                            <option>In Progress</option>

                            <option>Completed</option>

                        </select>

                        <label>Assign Users</label>

                        <div className="user-checkboxes">

                            {users.map(user => (

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

                            ))}

                        </div>

                        <button>

                            Update Task

                        </button>

                    </form>

                </div>

            </div>

        </>

    );

};

export default EditTask;