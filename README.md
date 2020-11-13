q-to-mongo
====

query string to mongodb query

Example
----
```js
const q2mongo = require('q-to-mongo');

/*
{
  name: "Jinwoo",
  age:  10
}
*/
console.log(q2mongo('name:Jinwoo age:10'));
```
```js
/*
{
  name: "Jinwoo",
  age:  10,
  gender: { $not: 'male' }
}
*/
console.log(q2mongo('name:Jinwoo age:10 -gender:male'));
```
```js
/*
{
  age:  { $gt: 10 },
}
*/
console.log(q2mongo('age:>10'));
```
