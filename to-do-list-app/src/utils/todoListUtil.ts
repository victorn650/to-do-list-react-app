export const getTodoList = async () => {
    const { VITE_BACKEND_SERVICE_URL, VITE_BACKEND_SERVICE_PORT } = import.meta.env;
    const backendUrl = `${VITE_BACKEND_SERVICE_URL}:${VITE_BACKEND_SERVICE_PORT}`;
    console.log('backend service url:', backendUrl);
    const result = await fetch(`http://${backendUrl}/api/todos`);
    console.log('get to do list result:', result);
    return result;
};