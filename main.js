const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
const todoListElement = document.querySelector(".todos__container");
const todonum = document.querySelector(".menu__clear__items-left");
const todoCategoryText = document.querySelector(".todos__title span");

let todoCategoryStatus = sessionStorage.getItem("todoCategoryStatus") || "all";

window.onload = () => {
  renderTodoList();
};

function renderTodoList() {
  let todoListHTML = "";

  todonum.innerHTML = `Items left: ${todoList.length}`;

  todoCategoryText.innerHTML = `<span>${todoCategoryStatus}</span>`;

  todoList.forEach((todo, index) => {
    if (todoCategoryStatus !== "all" && todo.status !== todoCategoryStatus) return;
    todoListHTML += `
    <div class="todos__item">
      <div class="todos__item-clock">
        <i>🕰️</i>
        <span>${todo.time}</span>
      </div>
      <div class="todos__item__content">
        <div
        name="status"
        class="todos__item-status ${todo.status}"
        onclick="changeTodoStatus(${index})"
        >
          <i class="fa-solid fa-check"></i>
        </div>
        <p class="todos__item-text" id="todo-text${index}">${todo.text}</p>
        <div class="todos__item-btns">
          <button class="todos__item-btn__edit" onclick="ModifyElement(${index})"">🖊️</button>
          <button class="todos__item-btn__del" onclick="deleteElement(${index})">X</button>
        </div>
      </div>
    </div>
    `;
  });
  todoListElement.innerHTML = todoListHTML;
}

const todoForm = document.querySelector(".todo__form");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoInput = document.querySelector(".todo__form-input");
  const todoText = todoInput.value;
  if (!todoText) {
    alert("Please enter a todo");
  } else {
    const todo = {
      text: todoText,
      status: "active",
      time: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }),
    };
    todoList.push(todo);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    todoInput.value = "";
    renderTodoList();
  }
});

function deleteElement(index) {
  let check = confirm("Are you sure you want to delete this todo?");
  if (!check) return;
  todoList.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderTodoList();
}

function ModifyElement(index) {
  const todoText = prompt("Enter new todo", todoList[index].text);
  if (!todoText) {
    alert("Please enter a todo");
  } else {
    todoList[index].text = todoText;
    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderTodoList();
  }
}

function changeTodoStatus(index) {
  if (todoList[index].status === "active") {
    todoList[index].status = "completed";
  } else {
    todoList[index].status = "active";
  }
  localStorage.setItem("todoList", JSON.stringify(todoList));
  renderTodoList();
}

const clearAll = document.querySelector(".menu__clear-btn");
clearAll.addEventListener("click", (e) => {
  e.preventDefault();
  todoList.splice(0, todoList.length);
  localStorage.removeItem("todoList");
  renderTodoList();
});

function changeCategory(status) {
  todoCategoryStatus = status;
  sessionStorage.setItem("todoCategoryStatus", todoCategoryStatus);
  renderTodoList(todoCategoryStatus);
}
