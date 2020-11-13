q-to-mongo
====

query string to mongodb query

Example
----
```
const q2mongo = require('q-to-mongo');

/*
{
  name: "Jinwoo",
  age:  10
}
*/
console.log(q2mongo('name:Jinwoo age:10'));
```
```
/*
{
  name: "Jinwoo",
  age:  10,
  gender: { $not: 'male' }
}
*/
console.log(q2mongo('name:Jinwoo age:10 -gender:male'));
```
```
{
  age:  { $gt: 10 },
}
*/
console.log(q2mongo('age:>10'));
```
