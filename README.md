# to-do-list-react-app

Personal to-do list web application with a React + Vite front-end and a Node.js + Express backend microservice, all containerized with Docker.

## Project Structure

```
to-do-list-react-app/
├── to-do-list-app/          # React + Vite front-end (TypeScript)
│   ├── src/
│   │   ├── App.tsx          # Main to-do list UI with full CRUD
│   │   ├── main.tsx         # React entry point
│   │   ├── vite-env.d.ts   # CSS module declarations
│   │   └── ...
│   ├── tsconfig.json
│   └── ...
└── to-do-list-backend/      # Node.js + Express API microservice (TypeScript)
    ├── src/
    │   ├── index.ts         # Express server entry point
    │   ├── db.ts            # PostgreSQL connection pool
    │   └── todoRoutes.ts   # CRUD routes for todo_list_table
    ├── tsconfig.json
    └── ...
```

## Architecture

```
┌─────────────────┐       ┌──────────────────┐       ┌─────────────────┐
│  React + Vite   │  HTTP │  Node.js +       │  SQL  │  PostgreSQL     │
│  Front-end      │ ─────▶│  Express Backend │ ─────▶│  (Docker)       │
│  (to-do-list-app)│       │  (to-do-list-backend)│    │  todo_list_table│
└─────────────────┘       └──────────────────┘       └─────────────────┘
```

All services run in Docker containers via `docker-compose.yml` (to be added).

## API Endpoints (to-do-list-backend)

| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| GET    | `/api/todos`       | Get all to-do items    |
| GET    | `/api/todos/:id`   | Get a single to-do     |
| POST   | `/api/todos`       | Create a new to-do     |
| PUT    | `/api/todos/:id`   | Update a to-do (title or completed) |
| DELETE | `/api/todos/:id`   | Delete a to-do         |
| GET    | `/health`          | Health check           |

## Database Schema

Table: `todo_list_table`

| Column       | Type                      | Notes                          |
|--------------|---------------------------|--------------------------------|
| `id`         | SERIAL PRIMARY KEY        | Auto-incrementing ID           |
| `title`      | VARCHAR(255) NOT NULL     | To-do item title               |
| `completed`  | BOOLEAN NOT NULL DEFAULT FALSE | Completion status         |
| `created_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Creation timestamp |

## Environment Variables (Backend)

| Variable        | Default         | Description           |
|-----------------|-----------------|-----------------------|
| `DB_HOST`       | `localhost`     | PostgreSQL host       |
| `DB_PORT`       | `5432`          | PostgreSQL port       |
| `DB_NAME`       | `todo_db`       | Database name         |
| `DB_USER`       | `todo_user`     | Database user         |
| `PORT`          | `3001`          | Backend server port   |

## Getting Started

### Front-end

```bash
cd to-do-list-app
npm install
npm run dev      # Start Vite dev server
npm run build    # Production build
```

### Back-end

```bash
cd to-do-list-backend
npm install
npm run dev      # Start with tsx (auto-reload)
npm run build    # Compile TypeScript
npm start        # Run compiled JS
```

---

**Jives** is helping to create this React web app.
