/*
    18220 - Filter
    -------
    by Muhun Kim (@x86chi) #medium #array #filter

    ### Question

    Implement the type `Filter<T, Predicate>` takes an Array `T`, primitive type or union primitive
    type `Predicate` and returns an Array include the elements of `Predicate`.

    > View on GitHub: https://tsch.js.org/18220
*/

/* _____________ Your Code Here _____________ */

type Filter<T extends unknown[], P> = T extends [infer L, ...infer R]
    ? L extends P
        ? [L, ...Filter<R, P>]
        : Filter<R, P>
    : [];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Falsy = "" | 0 | false | null | undefined;

export type Cases = [
    Expect<Equal<Filter<[0, 1, 2], 2>, [2]>>,
    Expect<Equal<Filter<[0, 1, 2], 0 | 1>, [0, 1]>>,
    Expect<Equal<Filter<[0, 1, 2], Falsy>, [0]>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/18220/answer
    > View solutions: https://tsch.js.org/18220/solutions
    > More Challenges: https://tsch.js.org
*/
