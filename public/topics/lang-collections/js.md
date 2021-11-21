### Arrays

```
let arr = [];
let arr = [1, 3.14, -2];

// in JS we can mix all types together
let arr = [true, 3.14, "text", null]
```

The most common operations on arrays are: `map`, `reduce`, `filter`, `join`, `slice`, `splice`, `sort`, `reverse`, `flat`, `some`, `every`.

We can also use [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to retrieve parts of the array:

```
let a, b, rest

[a, b, ...rest] = [1, 2, 3, 4, 5]
// result: a = 1, b = 2, rest = [3, 4, 5]
```

In addition to using the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (`...`) for destructuring, you can use it to construct arrays or pass arguments:

```
let items = [3, 4, 5]
let arr = [1, 2, ...items] // result: [1, 2, 3, 4, 5]

// concatenating arrays
let first = [1, 2, 3]
let second = [4, 5, 6]
let all = [...first, ...second]

// for arguments
const add = (x, y, z) => x + y + z
add(...items)      // returns: 12

// variadic arguments (any number of arguments for functions)
// see more at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
const sum = (...nums) => nums.reduce((s, curr)=> s + curr, 0)
sum(1, 2, 3, 4, 5) // returns: 15
sum(...arr)        // returns: 15
```

### Slices

Javascript doesn't have a concept of slices, but you can use [.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) to get a (new) copy of a portion of an array.

### Tuples

Javascript doesn't have a concept of tuples (you can't enforce strong limits on arrays size, they are always adjustable, i.e. you can always `.push()` more elements to it).

```
let tuple = ["pi", 3.14, true]

tuple.push(3) // valid
tuple[0] = 3  // valid
```