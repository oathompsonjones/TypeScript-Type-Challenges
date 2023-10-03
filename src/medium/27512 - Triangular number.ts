/*
    27152 - Triangular number
    -------
    by null (@aswinsvijay) #medium #tuple #array #math

    ### Question

    Given a number N, find the Nth triangular number, i.e. `1 + 2 + 3 + ... + N`

    > View on GitHub: https://tsch.js.org/27152
*/

/* _____________ Your Code Here _____________ */

type BuildTuple<N extends number, R extends number[] = [N]> = N extends 0
    ? []
    : R["length"] extends N
        ? R
        : BuildTuple<N, [...R, R["length"]]>;
type Add<N extends number, M extends number> = JoinNumber<AddLists<SplitNumber<N>, SplitNumber<M>>>;
type SumList<L extends number[], T extends number = 0> = L extends [infer X extends number, ...infer XS extends number[]]
    ? Add<T, X> extends number
        ? SumList<XS, Add<T, X>>
        : T
    : T;
type Triangular<N extends number> = SumList<BuildTuple<N>>;

/* _____________ Test Cases _____________ */
import type { AddLists, JoinNumber, SplitNumber } from "./27133 - Square.js";
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<Triangular<0>, 0>>,
    Expect<Equal<Triangular<1>, 1>>,
    Expect<Equal<Triangular<3>, 6>>,
    Expect<Equal<Triangular<10>, 55>>,
    Expect<Equal<Triangular<20>, 210>>,
    Expect<Equal<Triangular<55>, 1540>>,
    Expect<Equal<Triangular<100>, 5050>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/27152/answer
    > View solutions: https://tsch.js.org/27152/solutions
    > More Challenges: https://tsch.js.org
*/
