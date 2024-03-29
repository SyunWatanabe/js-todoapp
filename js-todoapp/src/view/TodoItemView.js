import { element } from "./html-util.js";

export class TodoItemView {
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked>
              <s>${todoItem.title}</s>
              <button class="delete">x</button>
            </input></li>`
      : element`<li><input type="checkbox" class="checkbox">
              ${todoItem.title}
              <button class="delete">x</button>
            </input></li>`;
    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      onUpdateTodo({
        id: todoItem.id,
        completed: !todoItem.completed
      });
    });
    const deleteBottonElement = todoItemElement.querySelector(".delete");
    deleteBottonElement.addEventListener("click", () => {
      onDeleteTodo({
        id: todoItem.id
      });
    });
    return todoItemElement;
  }
}
