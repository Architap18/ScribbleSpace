function enterApp() {
    const name = document.getElementById("username").value.trim();
    if (!name) return alert("Enter your name");

    localStorage.setItem("currentUser", name);
    if (!localStorage.getItem(name)) {
        localStorage.setItem(name, JSON.stringify([]));
    }

    window.location.href = "dashboard.html";
}
if (window.location.pathname.includes("dashboard.html")) {

    const user = localStorage.getItem("currentUser");
    document.getElementById("welcomeText").innerText = "Welcome, " + user;

    loadLists();

    function loadLists() {
        const lists = JSON.parse(localStorage.getItem(user));
        const container = document.getElementById("listsContainer");
        container.innerHTML = "";

        lists.forEach((list, index) => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerText = list.name;
            div.onclick = () => {
                localStorage.setItem("currentListIndex", index);
                window.location.href = "todo.html";
            };
            container.appendChild(div);
        });
    }

    window.createList = function () {
        const listName = document.getElementById("newListName").value;
        if (!listName) return;

        const lists = JSON.parse(localStorage.getItem(user));
        lists.push({ name: listName, tasks: [] });
        localStorage.setItem(user, JSON.stringify(lists));
        loadLists();
    }

    window.logout = function () {
        window.location.href = "index.html";
    }
}

// Todo Page
if (window.location.pathname.includes("todo.html")) {

    const user = localStorage.getItem("currentUser");
    const index = localStorage.getItem("currentListIndex");

    let lists = JSON.parse(localStorage.getItem(user));
    let currentList = lists[index];

    document.getElementById("listTitle").innerText = currentList.name;

    loadTasks();

    function loadTasks() {
        const container = document.getElementById("taskList");
        container.innerHTML = "";

        currentList.tasks.forEach((task, i) => {
            const div = document.createElement("div");
            div.className = "task";
            div.innerHTML = `
                ${task}
                <span onclick="deleteTask(${i})" style="cursor:pointer;">❌</span>
            `;
            container.appendChild(div);
        });
    }

    window.addTask = function () {
        const input = document.getElementById("taskInput");
        if (!input.value) return;

        currentList.tasks.push(input.value);
        input.value = "";
        save();
        loadTasks();
    }

    window.deleteTask = function (i) {
        currentList.tasks.splice(i, 1);
        save();
        loadTasks();
    }

    function save() {
        lists[index] = currentList;
        localStorage.setItem(user, JSON.stringify(lists));
    }

    window.goBack = function () {
        window.location.href = "dashboard.html";
    }
}

