const input = document.getElementById("todo-input");
const dayInput = document.getElementById("todo-day");
const dateInput = document.getElementById("todo-date");

const startTime = document.getElementById("start-time");
const startMeridiem = document.getElementById("start-meridiem");
const endTime = document.getElementById("end-time");
const endMeridiem = document.getElementById("end-meridiem");

const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

const colors = [
  "linear-gradient(135deg,#2196f3,#21cbf3)",
  "linear-gradient(135deg,#ff9800,#ffb74d)",
  "linear-gradient(135deg,#f44336,#ff7961)",
  "linear-gradient(135deg,#fbc02d,#fff176)",
  "linear-gradient(135deg,#4caf50,#81c784)",
  "linear-gradient(135deg,#9c27b0,#ce93d8)"
];

const todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoNode(todo, index) {
  const li = document.createElement("li");
  li.style.background = colors[index % colors.length];

  if (todo.completed) li.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;

  const content = document.createElement("div");
  content.className = "todo-content";

  const text = document.createElement("span");
  text.textContent = todo.text;

  const meta = document.createElement("small");
  meta.innerHTML = `📆 ${todo.day || "—"} | 📅 ${todo.date || "—"} | 🕒 ${todo.start} ${todo.startMeridiem} – ${todo.end} ${todo.endMeridiem}`;

  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    li.classList.toggle("completed", checkbox.checked);
    saveTodos();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "✕";
  delBtn.onclick = () => {
    todos.splice(index, 1);
    render();
    saveTodos();
  };

  content.append(text, meta);
  li.append(checkbox, content, delBtn);
  return li;
}

function render() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    list.appendChild(createTodoNode(todo, index));
  });
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return; // only task text is required

  todos.push({
    text,
    day: dayInput?.value || "",
    date: dateInput?.value || "",
    start: startTime?.value || "--",
    startMeridiem: startMeridiem?.value || "",
    end: endTime?.value || "--",
    endMeridiem: endMeridiem?.value || "",
    completed: false
  });

  input.value = "";
  if (dayInput) dayInput.value = "";
  if (dateInput) dateInput.value = "";
  if (startTime) startTime.value = "";
  if (endTime) endTime.value = "";

  render();
  saveTodos();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTodo();
});

render();