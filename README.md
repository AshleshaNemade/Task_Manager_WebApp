# 📋 Task Manager Web Application


# 🛠 Tech Stack

## Frontend

- React
- Vite
- React Router DOM
- Axios
- CSS

## Backend

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcryptjs
- express-validator


# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/AshleshaNemade/Task_Manager_WebApp.git


cd Task_Manager_WebApp
```

---

# 🗄 Database Setup

Open PostgreSQL.

Create a new database.

```sql
CREATE DATABASE task_manager;
```

Open the database and execute

```
backend/schema.sql
```

This creates all required tables.

---

# 🔐 Environment Variables

Inside the **backend** folder create a file named

```
.env
```

Copy the .env.example

Replace the PostgreSQL credentials with your own.

---

# 📦 Install Backend

```bash
cd backend

npm install
```

Start backend

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# 💻 Install Frontend

Open another terminal

```bash
cd frontend

npm install
```

Run frontend

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|-------------------|----------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/users | Get All Users |

---

## Tasks

| Method | Endpoint |
|----------|----------------|
| GET | /api/tasks |
| GET | /api/tasks/:id |
| POST | /api/tasks |
| PUT | /api/tasks/:id |
| DELETE | /api/tasks/:id |

---

## Activity Logs

| Method | Endpoint |
|----------|----------------|
| GET | /api/activity |

---

# 👤 Creating an Admin User

Register a normal user.

Then update its role in PostgreSQL.

```sql
UPDATE users
SET role='admin'
WHERE email='your_email@example.com';
```

Logout and Login again.

---

# 🧪 Testing

### Authentication

- Register User
- Login User
- JWT Authentication

### Tasks

- Create Task
- Edit Task
- Delete Task
- Assign Users

### Activity Logs

- View Logs (Admin Only)


# 👨‍💻 Author

**Ashlesha Nemade**

M.Tech Data Science

