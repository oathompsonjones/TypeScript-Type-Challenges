/*
    4182 - Fibonacci Sequence
    -------
    by windliang (@wind-liang) #medium

    ### Question

    Implement a generic `Fibonacci<T>` that takes a number `T` and returns its corresponding
    [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

    The sequence starts:
    1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

    For example
    ```ts
    type Result1 = Fibonacci<3> // 2
    type Result2 = Fibonacci<8> // 21
    ```

    > View on GitHub: https://tsch.js.org/4182
*/

/* _____________ Your Code Here _____________ */

type Fibonacci<
    T extends number,
    // Keeps track of the current index.
    I extends never[] = [never],
    // The first value.
    N1 extends never[] = [],
    // The second value.
    N2 extends never[] = [never]
> = I["length"] extends T // I === T ? ...
    ? N2["length"] // Return N2
    : Fibonacci<T,
    [...I, never], // I++
    N2, // N1 = N2
    [...N1, ...N2] // N2 = N1 + N2
    >;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<Fibonacci<1>, 1>>,
    Expect<Equal<Fibonacci<2>, 1>>,
    Expect<Equal<Fibonacci<3>, 2>>,
    Expect<Equal<Fibonacci<8>, 21>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/4182/answer
    > View solutions: https://tsch.js.org/4182/solutions
    > More Challenges: https://tsch.js.org
*/
