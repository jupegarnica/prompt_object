# Prompt_object

## About
ask for all the properties of an object, and use the current value as the type and the default value

## Usage
```js
import prompt_object from 'https://deno.land/x/prompt_object/prompt_object.ts'

const obj = {
  name: 'default name',
  age: 30,
  isMale: true,
  address: {
    city: 'default city',
    street: 'default street'
  },
  hobbies: ['code', 'music']

}

const result =  prompt_object(obj);

console.log(result);

//{
//   name: 'Garn',
//   age: 40,
//   isMale: true,
//   address: {
//     city: 'Valencia',
//     street: 'my street'
//   },
//   hobbies: ['fly', 'sleep', 'music', 'run']
// }
```