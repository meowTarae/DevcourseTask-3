import App from "./App.js";
import { LOCALSTORAGE_KEY } from "./constant.js";
import { getItem } from "./storage.js";

const initialState = getItem(LOCALSTORAGE_KEY, []);

const $app = document.querySelector(".app");

new App({
  $target: $app,
  initialState,
  title: "ToDoList",
});
