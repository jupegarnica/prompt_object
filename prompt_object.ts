type Path = string[];
// deno-lint-ignore no-explicit-any
type Any = any;

export function promptAny(anything: Any, path: Path = []): Any {
  // if (anything === null) {
  //     throw new Error("promptAny: unknown type");
  // }
  if (Array.isArray(anything)) {
    return promptArray(anything, path);
  }
  if (typeof anything === "object") {
    return promptObj(anything, path);
  }
  if (typeof anything === "string") {
    return promptText(anything, path);
  }
  if (typeof anything === "boolean") {
    return promptBoolean(anything, path);
  }
  if (typeof anything === "number") {
    return promptNumber(anything, path);
  }
  // if (typeof anything === "function") {
  //     return anything;
  // }
  throw new Error("promptAny: unknown type");
}

type Obj = { [key: string]: Any };

export function promptObj(object: Obj | null, path: Path = []): Obj {
  // should prompt for each key in the object deeply and return a new object wit the answers but, if a key contains and array should ask as many time as the user wants
  const result = {} as Obj;
  for (const key in object) {
    const value = object[key];
    const newPath = [...path, key];
    result[key] = promptAny(value, newPath);
  }
  return result;
}
type Array = Any[];

export function promptArray(array: Array, path: Path): Array {
  // should ask as many time as the user wants
  const result = [] as Array;
  const value = array[0];
  let answer;
  let index = 0;
  do {
    answer = promptAny(value, path.concat(String(index++)));
    result.push(answer);
  } while (confirm("add more?"));
  return result;
}

export function promptNumber(value: number, path: Path): number {
  const message = path.join(".");
  const answer = prompt(message, String(value));
  if (answer === null) {
    return value;
  }
  const number = Number(answer);
  if (Number.isNaN(number)) {
    return value;
  }
  return number;
}

export function promptBoolean(value: boolean, path: Path): boolean {
  const message = path.join(".");
  const answer = prompt(message, String(value));
  if (answer === null) {
    return value;
  }
  if (answer === "true") {
    return true;
  }
  if (answer === "false") {
    return false;
  }
  return value;
}

export function promptText(value: string, path: Path): string {
  const message = path.join(".");
  const answer = prompt(message, value);
  if (answer === null) {
    return value;
  }
  return answer;
}
