document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

document.getElementById("backBtn").addEventListener("click", function () {
    window.location.href = "dashboard.html";
});
document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") return;

    createTaskElement(taskText);
    saveTask(taskText);

    input.value = "";
}

function createTaskElement(text) {
    const taskList = document.getElementById("taskList");

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");

    const span = document.createElement("span");
    span.innerText = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "✕";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
        taskDiv.remove();
        removeTask(text);
    });

    taskDiv.appendChild(span);
    taskDiv.appendChild(deleteBtn);

    taskList.appendChild(taskDiv);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task));
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}