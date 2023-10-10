/*
    9384 - Maximum
    -------
    by ch3cknull (@ch3cknull) #hard #array

    ### Question

    ### Description

    Implement the type `Maximum`, which takes an input type `T`, and returns the maximum value in `T`.

    If `T` is an empty array, it returns `never`. **Negative numbers** are not considered.

    For example:

    ```ts
    Maximum<[]> // never
    Maximum<[0, 2, 1]> // 2
    Maximum<[1, 20, 200, 150]> // 200
    ```

    ### Advanced

    Can you implement type `Minimum` inspired by `Maximum`?

    > View on GitHub: https://tsch.js.org/9384
*/

/* _____________ Your Code Here _____________ */

type BuildTuple<T extends number, R extends number[] = []> = R["length"] extends T
    ? R
    : BuildTuple<T, [R["length"], ...R]>;
type MinusOne<T extends number, U extends number[] = BuildTuple<T>> = U[0];
type GreaterThan<T extends number, U extends number> = T extends 0
    ? false
    : U extends 0
        ? true
        : MinusOne<T> extends number
            ? MinusOne<U> extends number
                ? GreaterThan<MinusOne<T>, MinusOne<U>>
                : never
            : never;
type Maximum<T extends number[]> = T extends []
    ? never
    : T extends [infer F extends number, ...infer R extends number[]]
        ? GreaterThan<F, Maximum<R>> extends true
            ? F
            : Maximum<R>
        : never;

type LessThan<T extends number, U extends number> = GreaterThan<U, T>;
type Minimum<T extends number[]> = T extends []
    ? never
    : T extends [infer F extends number, ...infer R extends number[]]
        ? LessThan<F, Minimum<R>> extends true
            ? F
            : Minimum<R>
        : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<Maximum<[]>, never>>,
    Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
    Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,

    Expect<Equal<Minimum<[]>, never>>,
    Expect<Equal<Minimum<[0, 2, 1]>, 0>>,
    Expect<Equal<Minimum<[1, 20, 200, 150]>, 1>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/9384/answer
    > View solutions: https://tsch.js.org/9384/solutions
    > More Challenges: https://tsch.js.org
*/
