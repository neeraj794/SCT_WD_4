document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");

    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText === "") {
        alert("Task cannot be empty!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        dueDate: dueDate,
        completed: false
    };

    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    saveTasksToLocalStorage(tasks);

    taskInput.value = "";
    dueDateInput.value = "";
    
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = getTasksFromLocalStorage();

    tasks.forEach(task => {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = `${task.text} (Due: ${task.dueDate || "No Due Date"})`;
        if (task.completed) taskText.classList.add("completed");

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("task-buttons");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.classList.add("complete-btn");
        completeBtn.onclick = () => toggleComplete(task.id);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.onclick = () => editTask(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteTask(task.id);

        buttonContainer.append(completeBtn, editBtn, deleteBtn);
        li.append(taskText, buttonContainer);
        taskList.appendChild(li);
    });
}

function toggleComplete(taskId) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function editTask(taskId) {
    let tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        const newTaskText = prompt("Edit Task:", task.text);
        if (newTaskText !== null) {
            task.text = newTaskText.trim();
            saveTasksToLocalStorage(tasks);
            renderTasks();
        }
    }
}

function deleteTask(taskId) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.id !== taskId);

    saveTasksToLocalStorage(tasks);
    renderTasks();
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}
