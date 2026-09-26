export const getTodoList = async () => {
    const { VITE_BACKEND_SERVICE_URL } = import.meta.env;
    const result = await fetch(`${VITE_BACKEND_SERVICE_URL}/api/todos`);
    const todos = await result.json();
    return todos;
};

export const insertTodo = async (title: string) => {
    const { VITE_BACKEND_SERVICE_URL } = import.meta.env;
    const result = await fetch(`${VITE_BACKEND_SERVICE_URL}/api/todos`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ title })
    });
    const insertResponse = await result.json();
    return insertResponse;
};

export const deleteTodo = async (id: number) => {
    const { VITE_BACKEND_SERVICE_URL } = import.meta.env;
    const result = await fetch(`${VITE_BACKEND_SERVICE_URL}/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    });
    return result;
};

export const editTodo = async (id: number, title: string | undefined, completed: boolean) => {
    const { VITE_BACKEND_SERVICE_URL } = import.meta.env;
    const result = await fetch(`${VITE_BACKEND_SERVICE_URL}/api/todos/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ title, completed })
    });
    const updateResponse = await result.json();
    return updateResponse;
};