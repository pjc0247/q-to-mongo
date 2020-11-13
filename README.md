q-to-mongo
====

query string to mongodb query

Installation
----
```
yarn add q-to-mongo
```

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
__String Literal__
```js
/*
{
  name: "Long Jinwoo",
  age:  10
}
*/
console.log(q2mongo('name:"Long Jinwoo" age:10'));
```

Todo
----
* user query to db field adaptor(converter)
* time strings such as `last_login:>3d`
