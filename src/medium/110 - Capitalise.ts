/*
   110 - Capitalize
   -------
   by Anthony Fu (@antfu) #medium #template-literal

   ### Question

   Implement `Capitalize<T>` which converts the first letter of a string to uppercase and leave the rest as-is.

   For example

   ```ts
   type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
   ```

   > View on GitHub: https://tsch.js.org/110
*/

/* _____________ Your Code Here _____________ */

interface ToUpper {
    a: "A";
    b: "B";
    c: "C";
    d: "D";
    e: "E";
    f: "F";
    g: "G";
    h: "H";
    i: "I";
    j: "J";
    k: "K";
    l: "L";
    m: "M";
    n: "N";
    o: "O";
    p: "P";
    q: "Q";
    r: "R";
    s: "S";
    t: "T";
    u: "U";
    v: "V";
    w: "W";
    x: "X";
    y: "Y";
    z: "Z";
}
type MyCapitalise<S extends string> = S extends `${infer T extends keyof ToUpper}${infer U}` ? `${ToUpper[T]}${U}` : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<MyCapitalise<"foobar">, "Foobar">>,
    Expect<Equal<MyCapitalise<"FOOBAR">, "FOOBAR">>,
    Expect<Equal<MyCapitalise<"foo bar">, "Foo bar">>,
    Expect<Equal<MyCapitalise<"">, "">>,
    Expect<Equal<MyCapitalise<"a">, "A">>,
    Expect<Equal<MyCapitalise<"b">, "B">>,
    Expect<Equal<MyCapitalise<"c">, "C">>,
    Expect<Equal<MyCapitalise<"d">, "D">>,
    Expect<Equal<MyCapitalise<"e">, "E">>,
    Expect<Equal<MyCapitalise<"f">, "F">>,
    Expect<Equal<MyCapitalise<"g">, "G">>,
    Expect<Equal<MyCapitalise<"h">, "H">>,
    Expect<Equal<MyCapitalise<"i">, "I">>,
    Expect<Equal<MyCapitalise<"j">, "J">>,
    Expect<Equal<MyCapitalise<"k">, "K">>,
    Expect<Equal<MyCapitalise<"l">, "L">>,
    Expect<Equal<MyCapitalise<"m">, "M">>,
    Expect<Equal<MyCapitalise<"n">, "N">>,
    Expect<Equal<MyCapitalise<"o">, "O">>,
    Expect<Equal<MyCapitalise<"p">, "P">>,
    Expect<Equal<MyCapitalise<"q">, "Q">>,
    Expect<Equal<MyCapitalise<"r">, "R">>,
    Expect<Equal<MyCapitalise<"s">, "S">>,
    Expect<Equal<MyCapitalise<"t">, "T">>,
    Expect<Equal<MyCapitalise<"u">, "U">>,
    Expect<Equal<MyCapitalise<"v">, "V">>,
    Expect<Equal<MyCapitalise<"w">, "W">>,
    Expect<Equal<MyCapitalise<"x">, "X">>,
    Expect<Equal<MyCapitalise<"y">, "Y">>,
    Expect<Equal<MyCapitalise<"z">, "Z">>
];

/* _____________ Further Steps _____________ */
/*
   > Share your solutions: https://tsch.js.org/110/answer
   > View solutions: https://tsch.js.org/110/solutions
   > More Challenges: https://tsch.js.org
*/
