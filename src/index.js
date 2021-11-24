import './style/style.css';

const taskInputDesc = document.getElementById('input');
const button = document.getElementById('button');
const taskWrapper = document.querySelector('.todo-list');


let toDoList;
!localStorage.tasks ? toDoList = [] : toDoList = JSON.parse(localStorage.getItem('tasks'));
let toDoItemElements = [];

class Task {
    constructor(description) {
        this.description = description;
        this.vision = false;
    }
}


const createToDoTemplate = (task, index) => {
    return `
    <main class="todo-item ${task.vision ? 'checked' : ''}">
        <div class="description">${task.description}</div>
        <div class="buttons-wrapper">
            <input  onclick="checkTask(${index})" class="button-complete"  type="checkbox" ${task.vision ? 'checked' : ''} >
            <button onclick="delTask(${index})" class="button-delete">delete</button>
        </div>
    </main>`
}

const filterToDoList = () => {
    const activeTasks = toDoList.length && toDoList.filter(item => item.vision === false);
    const deletedTasks = toDoList.length && toDoList.filter(item => item.vision === true);
    toDoList = [...activeTasks, ...deletedTasks];
}
const htmlFillList = () => {
    taskWrapper.innerHTML = "";
    if (toDoList.length > 0) {
        filterToDoList();
        toDoList.forEach((item, index) => {
            taskWrapper.innerHTML += createToDoTemplate(item, index);
        });
        toDoItemElements = document.querySelectorAll('.todo-item');
    }
}

htmlFillList();
const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(toDoList));
}

const checkTask = index => {
    setTimeout(() => {
        toDoList[index].vision = !toDoList[index].vision;
        toDoItemElements[index].classList.toggle('checked');
        updateLocalStorage();
        htmlFillList();
    }, 200);
}
const delTask = index => {
    toDoItemElements[index].classList.add('deleted');
    setTimeout(() => {
        toDoList.splice(index, 1);
        updateLocalStorage();
        htmlFillList();
    }, 1000);
}
document.addEventListener('click', (e) => {
    if (e.target === button) {
        if(taskInputDesc.value.length > 0){
            toDoList.push(new Task(taskInputDesc.value))
        }
        updateLocalStorage();
        htmlFillList();
        taskInputDesc.value = '';
    }
})


