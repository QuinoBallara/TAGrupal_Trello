document.addEventListener("DOMContentLoaded", function () {
    console.log('El DOM está listo');
    const columns = document.querySelectorAll('.card-content');
    columns.forEach(column => {
        column.addEventListener('dragover', allowDrop);
        column.addEventListener('drop', drop);
        column.className = 'card-content-test';
    });


    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        task.addEventListener('dragstart', drag);
    });
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log("Drag start", ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    console.log("Drop", data);
    const taskElement = document.getElementById(data);
    console.log('taskElement', taskElement);

    if (ev.target.classList.contains('card-content')) {
        ev.target.appendChild(taskElement);
    } else if (ev.target.closest('.card-content')) {
        ev.target.closest('.card-content').appendChild(taskElement);
    }
}