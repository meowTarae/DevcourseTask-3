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
  $target.appendChild($todoList);
  const $ul = document.createElement("ul");
  $todoList.appendChild($ul);

  if (isObject(initialState)) throw new Error("ToDo data Error");

  // state 초기값 설정
  this.state = initialState;

  // #할거:
  // nextState에 대한 validation
  this.setState = (nextState) => {
    if (isObject(nextState)) throw new Error("ToDo data Error");
    this.state = nextState;
    this.render();
  };

  // #질문:
  // 아래 render() 구현 함수를 따로 js 파일을 만들어 리팩토링 하는게 좋을까요 ?
  // 아니면 고대로 여기 나둬도 괜찮을까요 ?
  this.render = () => {
    $ul.innerHTML = "";

    if (this.state.length) {
      this.state.map(({ text, id, isCompleted }) => {
        const $li = document.createElement("li");
        const $span = document.createElement("span");
        // #질문:
        // 버튼 텍스트 값을 아이콘으로 구현하는게 좋을지
        // 아래 코드처럼 icon 태그로 버튼처럼 활용하는게 좋을지 궁금합니다.
        const $completeBtn = document.createElement("i");
        const $deleteBtn = document.createElement("i");

        // $li
        $li.id = id;
        $li.style.listStyle = "none";

        // $completeBtn
        $completeBtn.className = `fas ${
          isCompleted ? "fa-redo-alt" : "fa-check"
        }`;
        $completeBtn.addEventListener("click", () => {
          onComplete(id, $span, $completeBtn, isCompleted);
        });

        // $span
        $span.innerText = text;
        $span.style.textDecoration = isCompleted ? "line-through" : "none";

        // $deleteBtn
        $deleteBtn.className = "fas fa-times";
        $deleteBtn.addEventListener("click", () => {
          onDelete(id);
        });

        // Add
        $li.appendChild($completeBtn);
        $li.appendChild($span);
        $li.appendChild($deleteBtn);
        $ul.appendChild($li);
      });
    }
  };

  this.render();
}
