/*
    6141 - Binary to Decimal
    -------
    by wotsushi (@wotsushi) #hard #math

    ### Question

    Implement `BinaryToDecimal<S>` which takes an exact string type `S` consisting
    0 and 1 and returns an exact number type corresponding with `S` when `S` is regarded as a binary.
    You can assume that the length of `S` is equal to or less than 8 and `S` is not empty.

    ```ts
    type Res1 = BinaryToDecimal<'10'>; // expected to be 2
    type Res2 = BinaryToDecimal<'0011'>; // expected to be 3
    ```

    > View on GitHub: https://tsch.js.org/6141
*/

/* _____________ Your Code Here _____________ */

type BuildTuple<T extends number, R extends number[] = []> = R["length"] extends T
    ? R
    : BuildTuple<T, [...R, R["length"]]>;
type Add<T extends number, U extends number> = [...BuildTuple<T>, ...BuildTuple<U>]["length"];
type ReverseString<S extends string, T extends string = ""> = S extends `${infer F}${infer R}`
    ? ReverseString<R, `${F}${T}`>
    : T;
type BinaryToDecimal<
    S extends string,
    B = ReverseString<S>,
    I extends unknown[] = []
> = B extends `${infer F extends "0" | "1"}${infer R}`
    ? Add<F extends "0"
        ? 0
        : [1, 2, 4, 8, 16, 32, 64, 128][I["length"]], BinaryToDecimal<S, R, [...I, unknown]>>
    : 0;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<BinaryToDecimal<"10">, 2>>,
    Expect<Equal<BinaryToDecimal<"0011">, 3>>,
    Expect<Equal<BinaryToDecimal<"00000000">, 0>>,
    Expect<Equal<BinaryToDecimal<"11111111">, 255>>,
    Expect<Equal<BinaryToDecimal<"10101010">, 170>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/6141/answer
    > View solutions: https://tsch.js.org/6141/solutions
    > More Challenges: https://tsch.js.org
*/
