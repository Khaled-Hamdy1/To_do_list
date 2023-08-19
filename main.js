const todoList = [];

// Get the todo form




function renderTodoList(status = "all") {
  const todoListElement = document.querySelector(".todos__container");
  let todoListHTML = "";

  todoList.forEach((todo, index) => {
    if (status !== "all" && todo.status !== status) return;
    const todonum = document.querySelector(".menu__clear__items-left");
    todonum.innerHTML = `$Items left: ${todoList.length}`;
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
        onclick="changeStatus(${index})"
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

const todoAddbtn = document.querySelector(".todo__form-btn");

todoAddbtn.addEventListener("click", (e) => {
  const todoInput = document.querySelector(".todo__form-input");
  const todoText = todoInput.value;
  if (!todoText) {
    alert("Please enter a todo");
  } else {
    const todo = {
      text: todoText,
      status: "pending",
      time: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }),
    };
    todoList.push(todo);
    todoInput.value = "";
    renderTodoList();
  }
});

function deleteElement(index) {
  todoList.splice(index, 1);
  renderTodoList();
}

function ModifyElement(index) {
  const todoText = prompt("Enter new todo");
  if (!todoText) {
    alert("Please enter a todo");
  } else {
    todoList[index].text = todoText;
    renderTodoList();
  }
}

function changeStatus(index) {
  if (todoList[index].status === "pending") {
    todoList[index].status = "completed";
  } else {
    todoList[index].status = "pending";
  }
  renderTodoList();
}
