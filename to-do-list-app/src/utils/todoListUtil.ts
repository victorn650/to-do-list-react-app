export const getTodoList = async () => {
    const { VITE_BACKEND_SERVICE_URL } = import.meta.env;
    const result = await fetch(`${VITE_BACKEND_SERVICE_URL}/api/todos`);
    const todos = await result.json();
    return todos;
};