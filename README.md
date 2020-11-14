q-to-mongo
====

human-friendly query string => mongodb query

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

Fallback Query
----
Fallback will be executed in case that input string is not a valid format.

```js
const q = q2mongo('boo', (q) => ({
  email: new RegExp(q),
  name: new RegExp(q),
}));

queryUser(q);
```
__example__
```js
// 'john' => Not a valid query,
//           Fallback query builder will be executed.
{
  email: new RegExp('john'),
  name: new RegExp('john'),
}

// 'name:john' => valid query
{
  name: new RegExp('john'),
}
```

Todo
----
* user query to db field adaptor(converter)
* time strings such as `last_login:>3d`
