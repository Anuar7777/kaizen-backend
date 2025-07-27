## 🚨 **Overview**

**Kaizen** is a modern full-stack application for efficient task planning and time management. It combines the functionality of classic Kanban boards with advanced time-blocking tools, allowing users to organize both personal and team workflows with maximum flexibility.

👉 This project is **backend only**. Frontend repository: [Kaizen Frontend](https://github.com/Anuar7777/kaizen-frontend)

## ⚙️ **Tech Stack**

- **NestJS**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT + Passport**
- **Docker Compose**

## 🔋 **Features**

- **Authentication**: Sign up, login, logout, and token refresh using JWT and cookie-based sessions.
- **User Profile**: Retrieve and update user profile.
- **Task Management**: Create, edit, delete, and view tasks.
- **Time Blocking**: Manage time blocks, including reordering and updating them.
- **Pomodoro Timer**: Create and manage Pomodoro sessions, including round tracking.

## 🤸 **Quick Start**

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [Docker Desktop](https://docs.docker.com/get-started/)

#### **Cloning the Repository**

```bash
git clone https://github.com/Anuar7777/kaizen-backend.git
cd kaizen-backend
```

#### **Running PostgreSQL with Docker**

Make sure Docker Desktop is installed and running. Then execute:

```bash
docker-compose up -d
```

#### **Installation**

Install the project dependencies using npm:

```bash
npm install
```

#### **Set Up Environment Variables**

Create a new file named .env in the root of project and add the following content:

```env
# Used by Prisma
DATABASE_URL=

# Used by Docker container to initialize PostgreSQL
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

# Frontend origin (used for CORS configuration)
CLIENT_URL=

# Port the backend server will run on
PORT=                        # Default: 5000

# Secret key for signing JWT tokens
JWT_SECRET=
```

#### **Applying Migrations**

After installing dependencies and launching the database container, apply all Prisma migrations and generate the client:

```bash
prisma migrate deploy
prisma generate
```

#### **Running the Project**

```bash
npm start
```

## 📬 **Postman Collection**

You can use the included Postman collection to explore and test the API endpoints:

[Download Postman Collection](./docs/kaizen.postman_collection.json)

To use it:

1. Open Postman
2. Click Import → File, and select kaizen.postman_collection.json
3. Set environment variables like `{{URL}}`, `{{ACCESS_TOKEN}}`, etc.
4. Start testing API with preconfigured requests.
