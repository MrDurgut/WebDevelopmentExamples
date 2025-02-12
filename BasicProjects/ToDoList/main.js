let taskNameObj = document.getElementById("taskName");
let classString = "list-group-item list-group-item-action ";
const toastLiveExample = document.getElementById('liveToast');
const deleteToast = document.getElementById('deletedToast');
const deleteAllTasksToast = document.getElementById('deletedAllToast');
const markDoneAllTasksToast = document.getElementById('markDoneToast');
const markNotDoneAllTasksToast = document.getElementById('markUndoneToast');
let todos = [];
let isFirstTask = true;

try {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
} catch (error) {
    console.error("Error loading todos:", error);
    todos = [];
}

document.addEventListener("DOMContentLoaded", () => {
    if (todos[0] == undefined) {
        nonTask();
    }
    else {
        isFirstTask = false;
        displayTasks();
    }
});

function nonTask() {
    const nonTaskText = document.createElement("h3");
    nonTaskText.innerHTML = "Not added any task.";
    nonTaskText.id = "nonTaskText";
    document.getElementById("listTasks").appendChild(nonTaskText);
}

function displayTasks() {
    let todoCount = 0;
    todos.forEach(todo => {
        let isChecked = localStorage.getItem(todo);
        // Create container div
        const containerDiv = document.createElement("div");
        containerDiv.id = "list-object-" + todoCount;

        // Create task link
        const taskObj = document.createElement("a");
        taskObj.href = `javascript:taskClick(${todoCount})`;
        taskObj.id = "task-" + todoCount;
        taskObj.innerHTML = todo;

        //Class String
        if (isChecked == 1) {
            taskObj.className = classString + "list-group-item-success";
            taskObj.innerHTML = `<del>${taskObj.innerHTML}</del>`;
        }
        else {
            taskObj.className = classString;
        }

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "btn btn-outline-danger";
        deleteBtn.innerHTML = '<i class="bi bi-trash"></i> Remove Task';
        deleteBtn.onclick = () => removeTask(containerDiv.id);

        // Append elements
        containerDiv.appendChild(taskObj);
        containerDiv.appendChild(deleteBtn);
        document.getElementById("listTasks").appendChild(containerDiv);
        todoCount++;
    });
}

function addButtonClicked() {
    if (isFirstTask) {
        document.getElementById("nonTaskText").remove();
        isFirstTask = false;
    }

    if (!taskNameObj.value) return;

    // Create container div
    const containerDiv = document.createElement("div");
    containerDiv.id = "list-object-" + todos.length;

    // Create task link
    const taskObj = document.createElement("a");
    taskObj.href = `javascript:taskClick(${todos.length})`;
    taskObj.id = "task-" + todos.length;
    taskObj.className = classString;
    taskObj.innerHTML = taskNameObj.value;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn-outline-danger";
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i> Görevi Sil';
    deleteBtn.onclick = () => removeTask(containerDiv.id);

    // Append elements
    containerDiv.appendChild(taskObj);
    containerDiv.appendChild(deleteBtn);
    document.getElementById("listTasks").appendChild(containerDiv);

    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    toastBootstrap.show();

    todos.push(taskNameObj.value);
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem(taskNameObj.value, 0);

    classString = "list-group-item list-group-item-action ";
    taskNameObj.value = "";
}

function taskClick(taskId) {
    let objName = "task-" + taskId;
    const taskObj = document.getElementById(objName);

    if (taskObj.className.includes("list-group-item-success")) {
        taskObj.className = classString;
        taskObj.innerHTML = taskObj.innerHTML.slice(5, taskObj.innerHTML.length - 6);
        localStorage.setItem(taskObj.innerHTML, 0);
    } else {
        taskObj.className = classString + "list-group-item-success";
        localStorage.setItem(taskObj.innerHTML, 1);
        taskObj.innerHTML = `<del>${taskObj.innerHTML}</del>`;
    }
}

function removeTask(taskName) {
    const taskObj = document.getElementById(taskName);
    let objId = taskName.slice(12, taskName.length);
    var deletedTodo = todos.splice(objId, 1); //Aray olarak döndürüyor 0. elemanı al
    localStorage.removeItem(deletedTodo[0]);
    localStorage.setItem("todos", JSON.stringify(todos));
    taskObj.remove();
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(deleteToast);
    toastBootstrap.show();

    if (todos[0] == undefined) {
        nonTask();
        isFirstTask = true;
    }
}

function deleteAllTasks() {
    //Todo listesini sıfırla ve local storage'dan sil ardından tüm taskların localstoragedaki verisini sil ve hiç görev eklenmedi yazısı çıkart
    todos.forEach(todo => {
        localStorage.removeItem(todo);
    });
    document.querySelector(".list-group").innerHTML = "";
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    nonTask();
    isFirstTask = true;
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(deleteAllTasksToast);
    toastBootstrap.show();
}

function markDoneAllTasks() {
    //Tüm todoların localstoragedaki verisini 1 yap ve görevleri çizgili yap
    todos.forEach(todo => {
        localStorage.setItem(todo, 1);
    });
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(markDoneAllTasksToast);
    toastBootstrap.show();
    location.reload();
}

function markNotDoneAllTasks() {
    todos.forEach(todo => {
        localStorage.setItem(todo, 0);
    });
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(markNotDoneAllTasksToast);
    toastBootstrap.show();
    location.reload();
}