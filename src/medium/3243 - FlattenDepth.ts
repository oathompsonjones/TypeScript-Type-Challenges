/*
    3243 - FlattenDepth
    -------
    by jiangshan (@jiangshanmeta) #medium #array

    ### Question

    Recursively flatten array up to depth times.

    For example:

    ```typescript
    type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
    type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
    ```

    If the depth is provided, it's guaranteed to be positive integer.

    > View on GitHub: https://tsch.js.org/3243
*/

/* _____________ Your Code Here _____________ */

type FlattenDepth<T extends unknown[], U extends number = 1, Acc extends never[] = []> = T extends [infer L, ...infer R]
    ? L extends unknown[]
        ? Acc["length"] extends U
            ? [L, ...FlattenDepth<R, U, Acc>]
            : [...FlattenDepth<L, U, [never, ...Acc]>, ...FlattenDepth<R, U, Acc>]
        : [L, ...FlattenDepth<R, U, Acc>]
    : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<FlattenDepth<[]>, []>>,
    Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
    Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
    Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
    Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
    Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
    Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/3243/answer
    > View solutions: https://tsch.js.org/3243/solutions
    > More Challenges: https://tsch.js.org
*/
