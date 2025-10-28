# 🧭 Task Tracker API

A simple **Task Tracker API** built with **Node.js**, **Express**, **PostgreSQL**, and **Drizzle ORM**, featuring **JWT authentication**.  
This project allows users to manage and track their daily tasks efficiently through a RESTful API.

---

## 🚀 Features

- 🔐 User authentication using JWT
- 🧾 CRUD operations on tasks (Create, Read, Update, Delete)
- 🧠 Status management:
  - ✅ Done
  - 🚧 In Progress
  - 🕓 To Do
- 🔍 Filter and list tasks by status
- 🗄️ PostgreSQL integration via Drizzle ORM
- ⚙️ Environment-based configuration with `.env`

---

## 🧩 Project Overview

**Task Tracker** helps users organize and track their work progress.  
It demonstrates backend development best practices, including:

- REST API design
- Token-based authentication
- Database schema management with Drizzle
- Typed database queries using TypeScript
- Robust and clean architecture

---

## 🛠️ Tech Stack

| Layer            | Technology         |
| ---------------- | ------------------ |
| Runtime          | Node.js            |
| Framework        | Express.js         |
| Database         | PostgreSQL         |
| ORM              | Drizzle ORM        |
| Authentication   | JWT (jsonwebtoken) |
| Password Hashing | bcryptjs           |
| Config           | dotenv             |
| Language         | TypeScript         |

---

## 📁 Project Structure

```
project-root/
├── src/
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── taskController.js
│ │
│ ├── db/
│ │ ├── client.js
│ │ ├── schema/
│ │ │ ├── users.js
│ │ │ ├── tasks.js
│ │
│ ├── middlewares/
│ │ └── authMiddleware.js
│ │
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── taskRoutes.js
│ │
│ ├── helpers/
│ │ ├── jwt.js
│ │ ├── password.js
│ │
│ ├── app.js
│ └── server.js
│
├── .env
├── package.json
├── drizzle.config.js
├── README.md
└── tsconfig.json
```

---

## ⚙️ Setup & Installation

1. **Clone the repository**

   ```bash
    git clone https://github.com/<your-username>/task-tracker.git
    cd task-tracker

   ```

2. **Install dependencies**

   ```bash
    npm install

   ```

3. **Set up environment variables**

   ```bash
    PORT=5000
    DATABASE_URL=postgres://postgres:password@localhost:5432/tasktracker
    JWT_SECRET=your_jwt_secret

   ```

4. **Run database migrations**

   ```bash
   npm run db:push
   ```

5. **Run th server**

   ```bash
   npm run db:push
   ```
