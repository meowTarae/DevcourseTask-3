export default function ToDoForm({ $target, onSubmit }) {
  // new로 생성하지 않을 시 에러
  if (!(this instanceof ToDoForm)) {
    throw new Error("'TodoForm' must be called with the new keyword");
  }

  const $form = document.createElement("form");
  $form.className = "TodoForm";
  $target.appendChild($form);
  let isInit = false;

  this.render = () => {
    $form.innerHTML = `
        <input type='text' autocomplete="off" name='todo' />
        <button>Add</button>
        `;

    if (!isInit) {
      $form.addEventListener("submit", (e) => {
        e.preventDefault();

        const $todo = $form.querySelector("input[name=todo]");
        const text = $todo.value;

        if (text.length) {
          $todo.value = "";

          const data = { text, id: "todo" + Date.now(), isCompleted: false };
          onSubmit(data);
        }
      });
      isInit = true;
    }
  };
  this.render();
}
