/*
    612 - KebabCase
    -------
    by Johnson Chu (@johnsoncodehk) #medium #template-literal

    ### Question

    Replace the `camelCase` or `PascalCase` string with `kebab-case`.

    `FooBarBaz` -> `foo-bar-baz`

    For example

    ```ts
    type FooBarBaz = KebabCase<"FooBarBaz">
    const foobarbaz: FooBarBaz = "foo-bar-baz"

    type DoNothing = KebabCase<"do-nothing">
    const doNothing: DoNothing = "do-nothing"
    ```

    > View on GitHub: https://tsch.js.org/612
*/

/* _____________ Your Code Here _____________ */

interface ToLower {
    A: "a";
    B: "b";
    C: "c";
    D: "d";
    E: "e";
    F: "f";
    G: "g";
    H: "h";
    I: "i";
    J: "j";
    K: "k";
    L: "l";
    M: "m";
    N: "n";
    O: "o";
    P: "p";
    Q: "q";
    R: "r";
    S: "s";
    T: "t";
    U: "u";
    V: "v";
    W: "w";
    X: "x";
    Y: "y";
    Z: "z";
}
type KebabCase<S extends string, T extends boolean = true> = S extends `${infer L}${infer R}`
    ? L extends keyof ToLower
        ? T extends true
            ? `${ToLower[L]}${KebabCase<R, false>}`
            : `-${ToLower[L]}${KebabCase<R, false>}`
        : `${L}${KebabCase<R, false>}`
    : "";

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
    Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
    Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
    Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
    Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
    Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
    Expect<Equal<KebabCase<"-">, "-">>,
    Expect<Equal<KebabCase<"">, "">>,
    Expect<Equal<KebabCase<"😎">, "😎">>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/612/answer
    > View solutions: https://tsch.js.org/612/solutions
    > More Challenges: https://tsch.js.org
*/
