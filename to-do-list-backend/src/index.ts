import express from "express"
import cors from "cors"
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./todoRoutes.js"

const app = express()
const PORT = Number(process.env.PORT) || 3001

app.use(cors())
app.use(express.json())

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// Todo CRUD routes
app.get("/api/todos", getTodos)
app.get("/api/todos/:id", getTodoById)
app.post("/api/todos", createTodo)
app.put("/api/todos/:id", updateTodo)
app.delete("/api/todos/:id", deleteTodo)

app.listen(PORT, () => {
  console.log(`🚀 To-Do List API server running on http://localhost:${PORT}`)
})
