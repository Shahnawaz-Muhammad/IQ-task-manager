# IQT-FSD-2026 — Task Manager

A full-stack Task Management application developed as part of the IQ Technologies Full Stack Developer Assessment.

The application allows users to manage tasks through a React frontend and a RESTful backend API, with PostgreSQL database persistence. It also integrates the OpenWeather API to display weather information.

## Live Demo

- **Frontend:** https://iq-task-manager-sigma.vercel.app/
- **Backend API:** https://iq-task-manager.onrender.com
- **Health Check:** https://iq-task-manager.onrender.com/health
- **GitHub Repository:** https://github.com/Shahnawaz-Muhammad/IQ-task-manager

## Features

### Task Management
- View all tasks.
- Create new tasks.
- Update existing tasks.
- Delete tasks.
- Mark tasks as completed or pending.
- Persist task data in PostgreSQL.

### Weather Integration
- Retrieve current weather information using the OpenWeather API.
- Fetch weather information for a selected city.
- Access weather data through the backend REST API.

### Additional Features
- Responsive React interface.
- RESTful API architecture.
- Database persistence using Prisma ORM.
- Separate frontend and backend codebases.
- Environment-based configuration.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| External API | OpenWeather API |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Database Hosting | Neon |

## Project Structure

```text
task-manager/
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── modules/
│   │   │   ├── tasks/
│   │   │   └── weather/
│   │   ├── generated/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## Database Schema

The application uses PostgreSQL with Prisma ORM.

### Task Model

| Field | Type | Description |
|---|---|---|
| id | String | Unique task identifier |
| title | String | Task title |
| description | String? | Optional task description |
| completed | Boolean | Completion status (default: false) |
| createdAt | DateTime | Creation timestamp |
| updatedAt | DateTime | Last update timestamp |

## REST API Endpoints

Base URL:

```text
https://iq-task-manager.onrender.com
```

### Task API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Retrieve all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Weather API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/weather?city={city}` | Retrieve weather information for a city |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check backend API availability |

## Local Installation and Setup

### Prerequisites

- Node.js (22 LTS recommended)
- npm
- PostgreSQL database

### 1. Clone the Repository

```bash
git clone https://github.com/Shahnawaz-Muhammad/IQ-task-manager.git

cd IQ-task-manager
```

Make sure you are using the `feat/task-api` branch, which contains the complete project.

```bash
git checkout feat/task-api
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
DATABASE_URL="your_postgresql_connection_string"
```

Add any required OpenWeather API configuration using the environment variable name expected by the weather module.

Generate the Prisma Client and apply database migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

Start the backend development server:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:3000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend development server:

```bash
npm run dev
```

Vite will display the local frontend URL in the terminal, typically:

```text
http://localhost:5173
```

## Production Deployment

The application uses the following deployment architecture:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Neon PostgreSQL

The frontend communicates with the deployed backend through the `VITE_API_URL` environment variable.

Production environment variable:

```env
VITE_API_URL=https://iq-task-manager.onrender.com
```

The backend uses `DATABASE_URL` to connect to the Neon PostgreSQL database.

## Assessment Deliverables

This project demonstrates:

- Frontend development using React and TypeScript.
- Backend development using Node.js and Express.
- REST API development and integration.
- CRUD operations and database persistence.
- PostgreSQL database design and Prisma ORM.
- Third-party API integration.
- Environment configuration and cloud deployment.

---

**Developed for:** Full Stack Developer Assessment  
**Project:** Task Manager  
**Assessment Reference:** IQT-FSD-2026