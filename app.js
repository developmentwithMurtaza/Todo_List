const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

// Load tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        deleteButton.onclick = () => {
            tasks.splice(index, 1);
            saveTasks(); // Save updated tasks to local storage
            renderTasks();
        };

        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    });
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Move the event listener outside of renderTasks
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = input.value.trim();

    if (task) {
        tasks.push(task);
        saveTasks(); // Save new tasks to local storage
        renderTasks();
        input.value = '';
    }
});

// Call renderTasks to initialize the list
renderTasks();
