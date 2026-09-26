import { FC, useEffect, useState } from 'react'
import './App.css'
import { deleteTodo, editTodo, getTodoList, insertTodo } from './utils/todoListUtil'

interface Todo {
  id: number
  title: string
  completed: boolean
  created_at: string
}

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');
  const [triggerGetItems, setTriggerGetItems] = useState<boolean>(false);
  
  const getItems = async () => {
    const result = await getTodoList();
    if (result && Array.isArray(result)) {
      setTodos(result);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  
  useEffect(() => {
    if (triggerGetItems) {
      getItems();
      setTriggerGetItems(false);
    }
  }, [triggerGetItems]);

  const addTodo = async () => {
    if (!newTitle.trim()) return;
    await insertTodo(newTitle.trim());
    setTriggerGetItems(true);
    setNewTitle('');
  };

  const toggleComplete = async (id: number) => {
    const completeItem = todos.find(item => item.id === id);
    if (completeItem) {
      const result = await editTodo(id, undefined, !completeItem.completed);
      console.log('complete todo:', result);
    }
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
  }

  const deleteTodoItem = async (id: number) => {
    const result = await deleteTodo(id);
    console.log('delete item:', result);
    if (result && result.status === 204) {
      setTodos(todos.filter(t => t.id !== id))
    }
  }

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditTitle(todo.title)
  }

  const saveEdit = async (id: number) => {
    if (!editTitle.trim()) return;
    const updateItem = todos.find(item => item.id === id);
    if (updateItem) {
      const result = await editTodo(id, editTitle.trim(), updateItem.completed);
      console.log('edit item:', result);
    }
    setTodos(todos.map(t =>
      t.id === id ? { ...t, title: editTitle.trim() } : t
    ))
    setEditingId(null)
    setEditTitle('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
  }

  const remainingCount = todos.filter(t => !t.completed).length
  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Personal To-Do List</h1>
        <p>Keep track of your tasks</p>
      </header>

      <main className="app-main">
        <section className="add-todo">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo} disabled={!newTitle.trim()}>
            Add Task
          </button>
        </section>

        <section className="todo-list">
          {todos.length === 0 && (
            <p className="empty-state">No tasks yet. Add one above!</p>
          )}
          {todos.map(todo => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
              {editingId === todo.id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                    autoFocus
                  />
                  <button onClick={() => saveEdit(todo.id)}>Save</button>
                  <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
                </div>
              ) : (
                <div className="view-mode">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                    className="todo-checkbox"
                    id={`checkbox-${todo.id}`}
                  />
                  <label htmlFor={`checkbox-${todo.id}`} className="todo-title">
                    {todo.title}
                  </label>
                  <div className="todo-actions">
                    <button onClick={() => startEdit(todo)} className="action-btn edit">
                      Edit
                    </button>
                    <button onClick={() => deleteTodoItem(todo.id)} className="action-btn delete">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="todo-stats">
          <span>{remainingCount} task(s) remaining</span>
          <span>{completedCount} task(s) completed</span>
        </section>
      </main>
    </div>
  )
}

export default App
