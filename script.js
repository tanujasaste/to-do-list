const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-container .btn-secondary');

let tasks = [];
let filter = 'all'; // Filter type: all, completed, incomplete

// Add Task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    renderTasks();
  }
});

// Remove Task
function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Toggle Task Completion
function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Filter Tasks
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filter = button.id.replace('filter', '').toLowerCase();
    renderTasks();
  });
});

// Render Tasks
function renderTasks() {
  taskList.innerHTML = '';
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task';

    const span = document.createElement('span');
    span.textContent = task.text;
    if (task.completed) span.classList.add('completed');
    span.addEventListener('click', () => toggleCompletion(index));

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeTask(index));

    li.appendChild(span);
    li.appendChild(removeButton);
    taskList.appendChild(li);
  });
}

// Initial Render
renderTasks();
