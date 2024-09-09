import {getTasks, createTask} from "./routes.js";

document.addEventListener("DOMContentLoaded", function () {
    console.log('El DOM está listo');
    const columns = document.querySelectorAll('.card-content');
    columns.forEach(column => {
        column.addEventListener('dragover', allowDrop);
        column.addEventListener('drop', drop);
    });


    const tasks = document.querySelectorAll('.task');
    tasks.forEach((task, index) => {
        task.id = `task-${index}`;
        task.addEventListener('dragstart', drag);
        task.draggable = true;
    });
    getTasks();
});


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    console.log("Drag start", ev.target.id);
    try {
        ev.dataTransfer.setData("text", ev.target.id);
        console.log('EXITOSO')
    } catch (error) {
        console.error("Error al intentar arrastrar", error);
    }
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    console.log("Drop", data);
    const taskElement = document.getElementById(data);
    if (!taskElement) {
        console.error(`No se encontró un elemento con el ID: ${data}`);
        return;
        w
    }


    const dropTarget = ev.target.closest('.card');
    if (dropTarget) {
        try {
            ev.target.closest('.card').querySelector('.card-content').appendChild(taskElement);
        } catch (error) {
            console.error("Error al intentar soltar", error);
        }
    }
}


