import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";

import { getTasks } from "../services/taskService";

const Dashboard = () => {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {

    try {

      setLoading(true);

      const data = await getTasks();

      setTasks(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadTasks();

  }, []);

  return (

    <>
      <Navbar />

      <div className="container">

        <Sidebar />

        <div className="main">

          <h2 className="page-title">
            Dashboard
          </h2>

          <p className="dashboard-subtitle">
            Manage your tasks efficiently.
          </p>

          {/* Statistics */}

          <div className="stats">

            <div className="stat-card">

              <h3>Total Tasks</h3>

              <p>{tasks.length}</p>

            </div>

            <div className="stat-card">

              <h3>Pending</h3>

              <p>
                {
                  tasks.filter(
                    task => task.status === "Pending"
                  ).length
                }
              </p>

            </div>

            <div className="stat-card">

              <h3>In Progress</h3>

              <p>
                {
                  tasks.filter(
                    task => task.status === "In Progress"
                  ).length
                }
              </p>

            </div>

            <div className="stat-card">

              <h3>Completed</h3>

              <p>
                {
                  tasks.filter(
                    task => task.status === "Completed"
                  ).length
                }
              </p>

            </div>

          </div>

          {/* Loader */}

          {loading ? (

            <Loader />

          ) : (

            <div className="card-grid">

              {tasks.length === 0 ? (

                <div className="empty-state">

                  <h3>No Tasks Yet</h3>

                  <p>
                    Click <strong>Create Task</strong> to add your first task.
                  </p>

                </div>

              ) : (

                [...tasks]
                  .sort((a, b) => {

                    const order = {
                      "Pending": 1,
                      "In Progress": 2,
                      "Completed": 3
                    };

                    return order[a.status] - order[b.status];

                  })
                  .map(task => (

                    <TaskCard
                      key={task.task_id}
                      task={task}
                      refresh={loadTasks}
                    />

                  ))

              )}

            </div>

          )}

        </div>

      </div>

    </>

  );

};

export default Dashboard;