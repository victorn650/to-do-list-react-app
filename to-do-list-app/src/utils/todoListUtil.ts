export const getTodoList = async () => {
    const { VITE_BACKEND_SERVICE_URL } = import.meta.env;
    console.log('backend service url:', VITE_BACKEND_SERVICE_URL);
    const result = await fetch(`${VITE_BACKEND_SERVICE_URL}/api/todos`);
    const todos = await result.json();
    console.log('get to do list result:', todos);
    return todos.json();
};