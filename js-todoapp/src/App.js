import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
  constructor() {
    //todolistの初期化
    this.todoListModel = new TodoListModel();
  }
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    //todolistモデルが更新されたら表示を更新する
    this.todoListModel.onChange(() => {
      const todoListView = new TodoListView(); 
      const todoItems = this.todoListModel.getTodoItems();
      const todoListElement = todoListView.createElement(todoItems, {
        // Todoアイテムが更新イベントが発生したときによばれるリスナー関数
        onUpdateTodo: ({ id, completed }) => {
          this.todoListModel.updateTodo({ id, completed });
        },
        // Todoアイテムが削除イベントが発生したときによばれるリスナー関数
        onDeleteTodo: ({ id }) => {
          this.todoListModel.deleteTodo({ id });
        }
      });
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `Todoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    formElement.addEventListener("submit", (event) => {
      // 本来のsubmitイベントの動作を止める
      event.preventDefault();
      this.todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false
      }));
      inputElement.value = "";
    }); 
  }
}
