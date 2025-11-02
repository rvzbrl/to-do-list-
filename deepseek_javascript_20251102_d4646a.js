// Load tasks dari localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        addTaskToDOM(task.text, task.completed, index);
    });

    updateStats();
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text === '') {
        alert('Tulis dulu tugasnya bang!');
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    addTaskToDOM(text, false, tasks.length - 1);
    taskInput.value = '';
    updateStats();
}

function addTaskToDOM(text, completed, index) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('li');
    taskItem.className = `task-item ${completed ? 'completed' : ''}`;
    
    taskItem.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${completed ? 'checked' : ''} 
               onchange="toggleTask(${index})">
        <span class="task-text">${text}</span>
        <button class="delete-btn" onclick="deleteTask(${index})">Hapus</button>
    `;

    taskList.appendChild(taskItem);
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks(); // Reload untuk update tampilan
}

function deleteTask(index) {
    if (confirm('Yakin hapus tugas ini?')) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

function clearCompleted() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const incompleteTasks = tasks.filter(task => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(incompleteTasks));
    loadTasks();
}

function clearAll() {
    if (confirm('Yakin hapus SEMUA tugas? Gabisa dibalikin lho!')) {
        localStorage.removeItem('tasks');
        loadTasks();
    }
}

function updateStats() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('completedTasks').textContent = completedTasks;
}

// Support Enter key untuk nambah task
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});