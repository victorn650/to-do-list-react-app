import { Pool } from "pg"

export const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || "todo_db",
  user: process.env.DB_USER || "todo_user",
  password: process.env.DB_PASSWORD || "change_me",
})
