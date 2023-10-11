import isObject from "./isObject.js";

export default function TodoList({
  $target,
  initialState,
  onComplete,
  onDelete,
}) {
  // new로 생성하지 않을 시 에러
  if (!(this instanceof TodoList)) {
    throw new Error("'ToDoList' must be called with the new keyword");
  }

  const $todoList = document.createElement("div");
  $todoList.className = "ToDoList";
  $target.appendChild($todoList);
  const $ul = document.createElement("ul");
  $todoList.appendChild($ul);

  if (isObject(initialState)) throw new Error("ToDo data Error");

  // state 초기값 설정
  this.state = initialState;

  this.setState = (nextState) => {
    if (isObject(nextState)) throw new Error("ToDo data Error");
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $ul.innerHTML = "";

    if (this.state.length) {
      this.state.map(({ text, id, isCompleted }) => {
        const $li = document.createElement("li");
        const $span = document.createElement("span");
        const $completeBtn = document.createElement("i");
        const $deleteBtn = document.createElement("i");

        // $li
        $li.id = id;

        // $completeBtn
        $completeBtn.className = `fas ${
          isCompleted ? "fa-redo-alt" : "fa-check"
        }`;
        $completeBtn.addEventListener("click", () => {
          onComplete(id, $span, $completeBtn, isCompleted);
        });

        // $span
        $span.innerText = text;
        $span.style.color = isCompleted ? "#f1f1f1c0" : "snow";
        $span.style.textDecoration = isCompleted ? "line-through" : "none";
        // $span.style.textDecorationColor = "red";

        // $deleteBtn
        $deleteBtn.className = "fas fa-times";
        $deleteBtn.addEventListener("click", () => {
          onDelete(id);
        });

        // Append
        $li.appendChild($completeBtn);
        $li.appendChild($span);
        $li.appendChild($deleteBtn);
        $ul.appendChild($li);
      });
    }
  };

  this.render();
}
