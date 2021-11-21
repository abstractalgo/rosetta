### Arrays

```
let arr: number[];
let arr: number[] = [1, 3.14, -2];

// alternative syntax
let arr: Array<number>

// array of any type
let arr: any[];
```

The most common operations on arrays are: `map`, `reduce`, `filter`, `includes`, `join`, `slice`, `splice`, `sort`, `reverse`, `flat`, `some`, `every`.

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

Javascript/Typescript doesn't have a concept of slices, but you can use [.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) to get a copy of a portion of an array.

### Tuples

Javascript doesn't have a concept of tuples (you can't enforce strong limits on arrays size, they are always adjustable, i.e. you can always `.push()` more elements to it). However, Typescript can enforce types a bit more.

```
let tuple: [string, number, boolean] = ["pi", 3.14, true] // each index in 'tuple' can be assigned only a specific variable type

// even though we can still add more things and break it...
tuple.push(3) // valid
// ...we can't do whatever
tuple[0] = 3 // invalid, it expects the first element to be of string type

// optional items
let tuple: [string, number?] = ["2"]  // valid
let tuple: [string?, number?] = []    // valid

// rest
type MyType = [string, ...number[], boolean] // zero or more numbers between a string and a boolean

let tuple: MyType = ["text", true]       // valid
let tuple: MyType = ["text", 3, true]    // valid
let tuple: MyType = ["text", 3, 4, true] // valid
let tuple: MyType = ["text", 3]          // invalid (missing the boolean)

type T = [string, number, ...number[], boolean] // one or more numbers between a string and a boolean

let tuple: T = ["text", true]       // invalid
let tuple: T = ["text", 3, true]    // valid
let tuple: T = ["text", 3, 4, true] // valid
let tuple: T = ["text", 3]          // invalid
```