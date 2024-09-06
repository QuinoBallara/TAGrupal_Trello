export const route = "http://localhost:3000/api";
document.addEventListener("DOMContentLoaded", async function () {

    const tasks = await getTasks();
    console.log(tasks);

    addTasks(tasks);
})

function addTasks(tasks) {
    tasks.forEach(task => {
        const newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.draggable = true;
        newTask.addEventListener('dragstart', drag);
        newTask.id = `${task.id}`;
        newTask.addEventListener('click', function (event) {
            document.getElementById('taskModalEdit').classList.add("is-active")
            document.getElementById('titleEdit').value = event.currentTarget.querySelector('#titleTask').textContent;
            document.getElementById('descriptionEdit').value = event.currentTarget.querySelector('#desc').textContent;
            document.getElementById('stateEdit').value = event.currentTarget.querySelector('#status').textContent;
            document.getElementById('assignEdit').value = event.currentTarget.querySelector('#assignee').textContent;
            document.getElementById('dateEdit').value = event.currentTarget.querySelector('#finalDate').textContent;
            document.getElementById('priorityEdit').value = event.currentTarget.querySelector('#priorityTask').textContent;
            window.taskToEdit = event.currentTarget;
        })

        newTask.innerHTML =
            `<h3 id="titleTask" >${task.title}</h3>
                <p id="desc" >${task.description}</p>
                <p id="status" class="hide">${task.status}</p>
                <p id="assignee" class="hide">${task.assignedTo}</p>
                <p id="finalDate" class="hide">${task.endDate}</p>
                <p id="priorityTask" class="hide">${task.priority}</p>`;

        if (task.status !== "") {
            document.getElementById(task.status).querySelector('.card-content').appendChild(newTask)
        }
    })
}

async function getTasks() {
    const tasks = await fetch(route + "/tasks", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await tasks.json();
    return data;
}

export function allowDrop(ev) {
    ev.preventDefault();
}

export function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

export function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const taskElement = document.getElementById(data);

    if (ev.target.classList.contains('card')) {
        ev.target.appendChild(taskElement);
    } else if (ev.target.closest('.card')) {
        ev.target.closest('.card').querySelector('.card-content').appendChild(taskElement);
        fetch(route + "/tasks/" + taskElement.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": taskElement.querySelector('#titleTask').textContent,
                "description": taskElement.querySelector('#desc').textContent,
                "assignedTo": taskElement.querySelector('#assignee').textContent,
                "endDate": taskElement.querySelector('#finalDate').textContent,
                "priority": taskElement.querySelector('#priorityTask').textContent,
                "status": ev.target.closest('.card').id

            })
        })
    }
}