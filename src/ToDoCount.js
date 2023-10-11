import { LOCALSTORAGE_KEY } from "./constant.js";
import isObject from "./isObject.js";
import { getItem } from "./storage.js";

export default function ToDoCount({ $target, initialState }) {
  // new로 생성하지 않을 시 에러
  if (!(this instanceof ToDoCount)) {
    throw new Error("'ToDoCount' must be called with the new keyword");
  }
  if (isObject(initialState)) throw new Error("ToDo data Error");

  const $todoCount = document.createElement("div");
  $todoCount.className = "ToDoCount";
  $target.appendChild($todoCount);

  this.state = getItem(LOCALSTORAGE_KEY, initialState);

  this.setState = () => {
    this.state = getItem(LOCALSTORAGE_KEY);
    this.render();
  };

  this.render = () => {
    $todoCount.innerHTML = "";

    const completedToDo = this.state.filter((todo) => todo.isCompleted);
    const count = completedToDo.length;
    const entire = this.state.length;

    const $span = document.createElement("span");

    $span.textContent = entire
      ? count === entire
        ? "You Finished ! Well done !"
        : `Completed ToDos : ${count} / ${entire}`
      : "Input your ToDo !";

    $todoCount.appendChild($span);
  };

  this.render();
}
