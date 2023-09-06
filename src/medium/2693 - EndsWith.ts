/*
    2693 - EndsWith
    -------
    by jiangshan (@jiangshanmeta) #medium #template-literal

    ### Question

    Implement `EndsWith<T, U>` which takes two exact string types and returns whether `T` ends with `U`

    For example:

    ```typescript
    type a = EndsWith<'abc', 'bc'> // expected to be true
    type b = EndsWith<'abc', 'abc'> // expected to be true
    type c = EndsWith<'abc', 'd'> // expected to be false
    ```

    > View on GitHub: https://tsch.js.org/2693
*/

/* _____________ Your Code Here _____________ */

type ReverseString<T extends string> = T extends `${infer L}${infer R}`
    ? `${ReverseString<R>}${L}`
    : "";

type EndsWith<T extends string, U extends string> = ReverseString<T> extends `${infer TLast}${infer TRest}`
    ? ReverseString<U> extends `${infer ULast}${infer URest}`
        ? TLast extends ULast
            ? EndsWith<ReverseString<TRest>, ReverseString<URest>>
            : false
        : true
    : T extends ""
        ? U extends ""
            ? true
            : false
        : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<EndsWith<"abc", "bc">, true>>,
    Expect<Equal<EndsWith<"abc", "abc">, true>>,
    Expect<Equal<EndsWith<"abc", "d">, false>>,
    Expect<Equal<EndsWith<"abc", "ac">, false>>,
    Expect<Equal<EndsWith<"abc", "">, true>>,
    Expect<Equal<EndsWith<"abc", " ">, false>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/2693/answer
    > View solutions: https://tsch.js.org/2693/solutions
    > More Challenges: https://tsch.js.org
*/
