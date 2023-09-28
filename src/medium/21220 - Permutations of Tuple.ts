/*
    21220 - Permutations of Tuple
    -------
    by null (@gaac510) #medium #union #tuple #conditional type #recursion

    ### Question

    Given a generic tuple type `T extends unknown[]`, write a type which produces all permutations of `T` as a union.

    For example:

    ```ts
    PermutationsOfTuple<[1, number, unknown]>
     * Should return:
     * | [1, number, unknown]
     * | [1, unknown, number]
     * | [number, 1, unknown]
     * | [unknown, 1, number]
     * | [number, unknown, 1]
     * | [unknown, number ,1]
    ```

    > View on GitHub: https://tsch.js.org/21220
*/

/* _____________ Your Code Here _____________ */

type PermutationsOfTuple<T extends unknown[], U extends unknown[] = []> = T extends [infer L, ...infer R]
    ? (
        R extends []
            ? never
            : PermutationsOfTuple<R, [L, ...U]>
    ) | [L, ...PermutationsOfTuple<[...R, ...U]>]
    : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect, ExpectFalse } from "@type-challenges/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Cases = [
    Expect<Equal<PermutationsOfTuple<[]>, []>>,
    Expect<Equal<PermutationsOfTuple<[any]>, [any]>>,
    Expect<Equal<PermutationsOfTuple<[any, unknown]>, [any, unknown] | [unknown, any]>>,
    Expect<Equal<
    PermutationsOfTuple<[any, unknown, never]>,
    [any, never, unknown] |
    [any, unknown, never] |
    [never, any, unknown] |
    [never, unknown, any] |
    [unknown, any, never] |
    [unknown, never, any]
    >>,
    Expect<Equal<
    PermutationsOfTuple<[1, number, unknown]>,
    [1, number, unknown] |
    [1, unknown, number] |
    [number, 1, unknown] |
    [number, unknown, 1] |
    [unknown, 1, number] |
    [unknown, number, 1]
    >>,
    ExpectFalse<Equal<PermutationsOfTuple<[ 1, number, unknown ]>, [unknown]>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/21220/answer
    > View solutions: https://tsch.js.org/21220/solutions
    > More Challenges: https://tsch.js.org
*/
