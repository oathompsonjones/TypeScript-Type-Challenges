/*
    216 - Slice
    -------
    by Anthony Fu (@antfu) #extreme #array

    ### Question

    Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes three arguments.
    The output should be a subarray of `Arr` from index `Start` to `End`.
    Indexes with negative numbers should be counted from reversely.

    For example

    ```ts
    type Arr = [1, 2, 3, 4, 5]
    type Result = Slice<Arr, 2, 4> // expected to be [3, 4]
    ```

    > View on GitHub: https://tsch.js.org/216
*/

/* _____________ Your Code Here _____________ */

type BuildTuple<N extends number, I extends unknown[] = []> = I["length"] extends N
    ? I
    : BuildTuple<N, [...I, unknown]>;
type MinusX<T extends number, U extends number> = BuildTuple<T> extends [...BuildTuple<U>, ...infer R]
    ? R["length"]
    : never;
type IsNegative<N extends number> = `${N}` extends `-${string}` ? true : false;
type Abs<N extends number> = `${N}` extends `-${infer X extends number}` ? X : N;
type Slice<
    Arr extends unknown[],
    Start extends number = 0,
    End extends number = Arr["length"],
    S extends number = IsNegative<Start> extends true ? MinusX<Arr["length"], Abs<Start>> : Start,
    E extends number = IsNegative<End> extends true ? MinusX<Arr["length"], Abs<End>> : End
> = Arr extends [...BuildTuple<S>, ...infer R]
    ? R extends [...infer F, ...BuildTuple<MinusX<Arr["length"], E>>]
        ? F
        : []
    : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Arr = [1, 2, 3, 4, 5];

export type Cases = [
    // Basic
    Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
    Expect<Equal<Slice<Arr, 0, 0>, []>>,
    Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

    // Optional args
    Expect<Equal<Slice<[]>, []>>,
    Expect<Equal<Slice<Arr>, Arr>>,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
    Expect<Equal<Slice<Arr, 0>, Arr>>,
    Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

    // Negative index
    Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
    Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

    // Invalid
    Expect<Equal<Slice<Arr, 10>, []>>,
    Expect<Equal<Slice<Arr, 1, 0>, []>>,
    Expect<Equal<Slice<Arr, 10, 20>, []>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/216/answer
    > View solutions: https://tsch.js.org/216/solutions
    > More Challenges: https://tsch.js.org
*/
