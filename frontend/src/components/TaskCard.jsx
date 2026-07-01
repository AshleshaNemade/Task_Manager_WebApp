import { Link } from "react-router-dom";
import { deleteTask } from "../services/taskService";
import { useAuth } from "../context/AuthContext";

const TaskCard = ({ task, refresh }) => {

    const { user } = useAuth();

    const canEdit =
        user.role === "admin" ||
        task.assignedUsers?.some(
            assignedUser => assignedUser.user_id === user.id
        );

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${task.title}"?`
        );

        if (!confirmDelete) return;

        try {

            await deleteTask(task.task_id);

            refresh();

        } catch (error) {

            alert("Unable to delete task.");

        }

    };

    return (

        <div className="task-card">

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
                <strong>Status:</strong>{" "}

                <span
                    className={`status ${task.status.replace(/\s/g, "")}`}
                >
                    {task.status}
                </span>

            </p>

            <p>

                <strong>Created By:</strong>{" "}

                {task.creator_name}

            </p>

            <div className="assigned-users">

                <strong>Assigned Users</strong>

                <div className="user-list">

                    {
                        task.assignedUsers &&
                        task.assignedUsers.length > 0 ?

                        task.assignedUsers.map(user => (

                            <span
                                key={user.user_id}
                                className="user-chip"
                            >
                                {user.name}
                            </span>

                        ))

                        :

                        <span className="no-users">

                            No users assigned

                        </span>

                    }

                </div>

            </div>

            <div className="card-buttons">

                {
                    canEdit && (
                        <Link to={`/edit-task/${task.task_id}`}>
                            <button>Edit</button>
                        </Link>
                    )
                }

                {
                    user.role === "admin" && (

                        <button
                            className="delete-btn"
                            onClick={handleDelete}
                        >

                            Delete

                        </button>

                    )
                }

            </div>

        </div>

    );

};

export default TaskCard;