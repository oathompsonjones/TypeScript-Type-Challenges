/*
    27862 - CartesianProduct
    -------
    by jazelly (@jazelly) #medium #union

    ### Question

    Given 2 sets (unions), return its Cartesian product in a set of tuples, e.g.
    ```ts
    CartesianProduct<1 | 2, 'a' | 'b'>
    // [1, 'a'] | [2, 'a'] | [1, 'b'] | [2, 'b']
    ```

    > View on GitHub: https://tsch.js.org/27862
*/

/* _____________ Your Code Here _____________ */

type CartesianProduct<T, U> = T extends T
    ? U extends U
        ? [T, U]
        : never
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<CartesianProduct<1 | 2, "a" | "b">, [1, "a"] | [1, "b"] | [2, "a"] | [2, "b"]>>,
    Expect<Equal<CartesianProduct<1 | 2 | 3, "a" | "b" | "c">,
    [1, "a"] | [1, "b"] | [1, "c"] | [2, "a"] | [2, "b"] | [2, "c"] | [3, "a"] | [3, "b"] | [3, "c"]>>,
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    Expect<Equal<CartesianProduct<1 | 2, never | "a">, [1, "a"] | [2, "a"]>>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    Expect<Equal< CartesianProduct<"a", Function | string>, ["a", Function] | ["a", string]>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/27862/answer
    > View solutions: https://tsch.js.org/27862/solutions
    > More Challenges: https://tsch.js.org
*/
