// Get elements
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load saved tasks from localStorage when page loads
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    createTaskElement(task.text, task.completed);
  });
};

// Add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText, false);
  saveTasks();
  taskInput.value = "";
}

// Create a task <li>
function createTaskElement(text, completed) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");
  li.innerHTML = `
    <span onclick="toggleComplete(this)">${text}</span>
    <button onclick="deleteTask(this)">✖</button>
  `;
  taskList.appendChild(li);
}

// Mark task as completed
function toggleComplete(span) {
  span.parentElement.classList.toggle("completed");
  saveTasks();
}

// Delete task
function deleteTask(btn) {
  btn.parentElement.remove();
  saveTasks();
}

// Save all tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
