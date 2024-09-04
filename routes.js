const backend = 'http://localhost:3000/api/';

export async function getTasks() {
    const response = await fetch(`${backend}tasks`, {
        method: 'GET',
    });
    const data = await response.json();
    console.log('Data:', data);
    return data;
}

export async function createTask(task) {
    await fetch(`${backend}tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
}

