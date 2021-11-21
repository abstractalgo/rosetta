Numbers (integers, floats etc):

```
let value = 42;
let value = 3.14159265;
let value = 1e6;       // scientific notation
let value = 0xA1D;     // hex
let value = 034;       // octal
let value = 1_000_000; // numeric separators (https://github.com/tc39/proposal-numeric-separator)
let value = NaN;       // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN

// ops
5 + 3  // =8
5 - 3  // =2
5 * 3  // =15
5 / 3  // =1.6666666666666667
5 ** 3 // =125 (exponentiation)
5 & 3  // =0x1 (bitwise 'and')
5 | 3  // =0x111 (bitwise 'or')
5 ^ 3  // =0x110 (bitwise 'xor')

typeof 3.14 // "number"
```

Strings:
```
let value = "some text";
let value = 'some text';

// ops
"first" + "second" // "firstsecond"
"first"[0]         // "f"

typeof "text"      // "string"

// template literals (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) can do complex formatting and inline eval
let a = 1;
let b = 2;
let value = `some text ${a + b}`; // "some text 3"
```

Booleans:
```
let value = true;
let value = false;

false && true // false ('and')
false || true // true ('or')
!false        // true ('not')

typeof false  // "boolean"
```

Nullish values:
```
let value = null
let value = undefined

typeof null      // "object"
typeof undefined // "undefined"

// '!value' returns 'true' for null, undefined, false and empty string ("")
```