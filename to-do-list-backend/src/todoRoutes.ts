import { Request, Response } from "express"
import { pool } from "./db.js"

export async function getTodos(req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT id, title, completed, created_at FROM todo_list_table ORDER BY created_at ASC")
    res.json(result.rows)
  } catch (err) {
    console.error("Error fetching todos:", err)
    res.status(500).json({ error: "Failed to retrieve todos" })
  }
}

export async function getTodoById(req: Request, res: Response) {
  const id = Number(req.params.id)
  try {
    const result = await pool.query(
      "SELECT id, title, completed, created_at FROM todo_list_table WHERE id = $1",
      [id],
    )
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Todo not found" })
    } else {
      res.json(result.rows[0])
    }
  } catch (err) {
    console.error("Error fetching todo:", err)
    res.status(500).json({ error: "Failed to retrieve todo" })
  }
}

export async function createTodo(req: Request, res: Response) {
  const { title } = req.body
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    res.status(400).json({ error: "Title is required and must be a non-empty string" })
    return
  }
  try {
    const result = await pool.query(
      "INSERT INTO todo_list_table (title, completed) VALUES ($1, $2) RETURNING id, title, completed, created_at",
      [title.trim(), false],
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error("Error creating todo:", err)
    res.status(500).json({ error: "Failed to create todo" })
  }
}

export async function updateTodo(req: Request, res: Response) {
  const id = Number(req.params.id)
  const { title, completed } = req.body
  if (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) {
    res.status(400).json({ error: "Title must be a non-empty string if provided" })
    return
  }
  try {
    if (title !== undefined) {
      const result = await pool.query(
        "UPDATE todo_list_table SET title = $1 WHERE id = $2 RETURNING id, title, completed, created_at",
        [title.trim(), id],
      )
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Todo not found" })
      } else {
        res.json(result.rows[0])
      }
    } else {
      const result = await pool.query(
        "UPDATE todo_list_table SET completed = $1 WHERE id = $2 RETURNING id, title, completed, created_at",
        [Boolean(completed), id],
      )
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Todo not found" })
      } else {
        res.json(result.rows[0])
      }
    }
  } catch (err) {
    console.error("Error updating todo:", err)
    res.status(500).json({ error: "Failed to update todo" })
  }
}

export async function deleteTodo(req: Request, res: Response) {
  const id = Number(req.params.id)
  try {
    const result = await pool.query("DELETE FROM todo_list_table WHERE id = $1 RETURNING id", [id])
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Todo not found" })
    } else {
      res.status(204).send()
    }
  } catch (err) {
    console.error("Error deleting todo:", err)
    res.status(500).json({ error: "Failed to delete todo" })
  }
}
