export default function isObject(obj) {
  return (
    typeof obj === "object" &&
    obj !== null &&
    obj.hasOwnProperty("text") &&
    obj.hasOwnProperty("id") &&
    obj.hasOwnProperty("isCompleted")
  );
}
