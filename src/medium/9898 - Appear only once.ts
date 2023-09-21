/*
    9898 - Appear only once
    -------
    by X.Q. Chen (@brenner8023) #medium

    ### Question

    Find the elements in the target array that appear only once. For example：input: `[1,2,2,3,3,4,5,6,6,6]`，ouput: `[1,4,5]`.

    > View on GitHub: https://tsch.js.org/9898
*/

/* _____________ Your Code Here _____________ */

type RemoveNever<T extends unknown[]> = T extends [infer L, ...infer R]
    ? [L] extends [never]
        ? RemoveNever<R>
        : [L, ...RemoveNever<R>]
    : T;
type Filter<T extends unknown[], U> = RemoveNever<{
    [K in keyof T]: T[K] extends U ? T[K] : never;
}>;
type FindEles<T extends unknown[]> = RemoveNever<{
    [K in keyof T]: Filter<T, T[K]>["length"] extends 1 ? T[K] : never;
}>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
    Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
    Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/9898/answer
    > View solutions: https://tsch.js.org/9898/solutions
    > More Challenges: https://tsch.js.org
*/
