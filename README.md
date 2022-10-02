# Prompt_object

## About
ask for all the properties of an object, and use the current value as the type and the default value

## Usage
```js
import prompt_object from 'https://deno.land/x/prompt_object/prompt_object.ts'

const obj = {
  name: 'default name',
  age: 30
}

const result =  prompt_object(obj);

console.log(result);

// {
//     name: 'Mi name',
//     age: 20
// }
```