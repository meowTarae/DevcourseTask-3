import Header from "./Header.js";
import ToDoCount from "./ToDoCount.js";
import ToDoForm from "./TodoForm.js";
import { LOCALSTORAGE_KEY } from "./constant.js";
import { setItem } from "./storage.js";
import TodoList from "./ToDoList.js";

export default function App({ $target, initialState, title }) {
  // new로 생성하지 않을 시 에러
  if (!(this instanceof App)) {
    throw new Error("App must be called with the new keyword");
  }

  this.rerender = (state) => {
    todoList.setState(state);
    setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
  };

  new Header({
    $target,
    title,
  });

  new ToDoForm({
    $target,
    onSubmit: (data) => {
      const nextState = [...todoList.state, data];
      this.rerender(nextState);
      toDoCount.setState();
    },
  });

  const todoList = new TodoList({
    $target,
    initialState,
    onComplete: (id, $span, $button, isCompleted) => {
      $span.style.textDecoration = isCompleted ? "none" : "line-through";
      $button.classList.toggle("fa-redo-alt", !isCompleted);
      $button.classList.toggle("fa-check", isCompleted);

      todoList.state.forEach(
        (todo) => todo.id === id && (todo.isCompleted = !isCompleted)
      );

      this.rerender(todoList.state);
      toDoCount.setState();
    },
    onDelete: (id) => {
      const nextState = todoList.state.filter((todo) => todo.id !== id);
      this.rerender(nextState);
      toDoCount.setState();
    },
  });

  const toDoCount = new ToDoCount({
    $target,
    initialState,
  });
}
