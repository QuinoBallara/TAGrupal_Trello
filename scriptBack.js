export async function getTasks() {
    const data = await fetch("http://localhost:3000/api/tasks",{method:'get'})
    .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud GET');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos obtenidos:', data);
        return data;
    })
    .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
    });
    
    return data
}

export async function  createTask(task){
    console.log()
    const data = await fetch("http://localhost:3000/api/tasks",{
        method:'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title:task.querySelector('#titleTask').textContent,
            description:task.querySelector('#desc').textContent,
            status:task.querySelector('#status').textContent,
            assignedTo:task.querySelector('#assignee').textContent,
            endDate:task.querySelector('#finalDate').textContent,
            priority:task.querySelector('#priorityTask').textContent
        })
    })
    return await data.json()

}

export async function updateTask(task){
    console.log()
    const id = task.id
    const data = await fetch('http://localhost:3000/api/tasks/' + id,{
        method:'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title:task.querySelector('#titleTask').textContent,
            description:task.querySelector('#desc').textContent,
            status:task.querySelector('#status').textContent,
            assignedTo:task.querySelector('#assignee').textContent,
            endDate:task.querySelector('#finalDate').textContent,
            priority:task.querySelector('#priorityTask').textContent
        })
    })
    return await data.json()

}

export async function deleteTask(task){
    const id = task.id
    fetch ('http://localhost:3000/api/tasks/' + id,
    {
        method:'DELETE',
        headers: {
            "Content-Type": "application/json"
        }    
    })


}
