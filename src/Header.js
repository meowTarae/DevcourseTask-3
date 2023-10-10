export default function Header({ $target, text }) {
  // new로 생성하지 않을 시 에러
  if (!(this instanceof Header)) {
    throw new Error("'Header' must be called with the new keyword");
  }

  const $header = document.createElement("h1");

  $target.appendChild($header);

  this.render = () => {
    $header.textContent = text;
  };

  this.render();
}
