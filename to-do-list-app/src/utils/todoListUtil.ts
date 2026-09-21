interface Todo {
  id: number
  title: string
  completed: boolean
  created_at: string
}

export const getTodoList = async () => {
    const { VITE_BACKEND_SERVICE_URL } = import.meta.env;
    const result = await fetch(`${VITE_BACKEND_SERVICE_URL}/api/todos`);
    const todos = await result.json();
    return todos;
};

export const insertTodo = async (todo: Todo) => {
    const { VITE_BACKEND_SERVICE_URL } = import.meta.env;
    const result = await fetch(`${VITE_BACKEND_SERVICE_URL}/api/todos`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(todo)
    });
    const insertResponse = await result.json();
    console.log('insert item result:', insertResponse);
    return insertResponse;
};

export const deleteTodo = async (id: number) => {
    const { VITE_BACKEND_SERVICE_URL } = import.meta.env;
    const result = await fetch(`${VITE_BACKEND_SERVICE_URL}/api/todos/:${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    });
    const deleteResponse = await result.json();
    console.log('delete item result:', deleteResponse);
    return deleteResponse;
};

export const editTodo = async (id: number, title: string, completed: boolean) => {
    const { VITE_BACKEND_SERVICE_URL } = import.meta.env;
    const result = await fetch(`${VITE_BACKEND_SERVICE_URL}/api/todos/:${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ title, completed })
    });
    const updateResponse = await result.json();
    console.log('edit item response:', updateResponse);
    return updateResponse;
};