export const getTodoList = async () => {
    const result = await fetch('/api/todos');
    if (!result.ok) {
        console.log('an error ocurred while fetching todo list items');
    }
    const todos = await result.json();
    return todos;
};

export const insertTodo = async (title: string) => {
    const result = await fetch('/api/todos', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ title })
    });
    if (!result.ok) {
        console.log('an error ocurred while creating todo list item');
    }
    const insertResponse = await result.json();
    return insertResponse;
};

export const deleteTodo = async (id: number) => {
    const result = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    });
    if (!result.ok) {
        console.log('an error ocurred while deleting todo list item');
    }
    return result;
};

export const editTodo = async (id: number, title: string | undefined, completed: boolean) => {
    const result = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ title, completed })
    });
    if (!result.ok) {
        console.log('an error ocurred while editing todo list items');
    }
    const updateResponse = await result.json();
    return updateResponse;
};