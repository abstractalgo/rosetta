Numbers (integers, floats etc):

```
let value: number = 42;
let value: number = 3.14159265;
let value: number = 1e6;       // scientific notation
let value: number = 0xA1D;     // hex
let value: number = 034;       // octal
let value: number = 1_000_000; // numeric separators (https://github.com/tc39/proposal-numeric-separator)
let value: number = NaN;       // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN

// ops
5 + 3  // =8
5 - 3  // =2
5 * 3  // =15
5 / 3  // =1.6666666666666667
5 ** 3 // =125 (exponentiation)
5 & 3  // =0x1 (bitwise 'and')
5 | 3  // =0x111 (bitwise 'or')
5 ^ 3  // =0x110 (bitwise 'xor')
```
&nbsp;

Strings:
```
let value: string = "some text";
let value: string = 'some text';

// ops
"first" + "second" // "firstsecond"
"first"[0]         // "f"

// template literals (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) can do complex formatting and inline eval
let a: number = 1;
let b: number = 2;
let value: string = `some text ${a + b}`; // "some text 3"
```
&nbsp;

&nbsp;

Booleans:
```
let value: boolean = true;
let value: boolean = false;

false && true // false ('and')
false || true // true ('or')
!false        // true ('not')
```
&nbsp;

Nullish values:
```
let value: null = null
let value: undefined = undefined
```