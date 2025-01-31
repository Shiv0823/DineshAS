document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const allBtn = document.getElementById("allBtn");
    const completedBtn = document.getElementById("completedBtn");
    const activeBtn = document.getElementById("activeBtn");

    let tasks = [];

    function addTask(taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);
        renderTasks();
    }

    function renderTasks(filter = "all") {
        taskList.innerHTML = "";
        const filteredTasks = filterTasks(filter);

        filteredTasks.forEach(task => {
            const taskElement = document.createElement("li");
            taskElement.classList.toggle("completed", task.completed);
            taskElement.innerHTML = `
                <span>${task.text}</span>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="toggleCompletion(${task.id})">${task.completed ? "Undo" : "Complete"}</button>
            `;
            taskList.appendChild(taskElement);
        });
    }

    function filterTasks(filter) {
        switch (filter) {
            case "completed":
                return tasks.filter(task => task.completed);
            case "active":
                return tasks.filter(task => !task.completed);
            default:
                return tasks;
        }
    }

    window.toggleCompletion = (id) => {
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            renderTasks();
        }
    };

    window.deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    };

    addBtn.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
        }
    });

    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                addTask(taskText);
                taskInput.value = "";
            }
        }
    });

    allBtn.addEventListener("click", () => renderTasks("all"));
    completedBtn.addEventListener("click", () => renderTasks("completed"));
    activeBtn.addEventListener("click", () => renderTasks("active"));

    renderTasks();
});
