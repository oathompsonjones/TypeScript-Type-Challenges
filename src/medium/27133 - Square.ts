/*
    27133 - Square
    -------
    by null (@aswinsvijay) #medium #tuple #array #math

    ### Question

    Given a number, your type should return its square.

    > View on GitHub: https://tsch.js.org/27133
*/

/* _____________ Your Code Here _____________ */

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type Tuple<Length extends Digit, Result extends unknown[] = []> = Result["length"] extends Length
    ? Result
    : Tuple<Length, [...Result, unknown]>;
type Carry<N> = N extends number
    ? `${N}` extends `${infer X extends Digit}${infer Y extends Digit}`
        ? [X, Y]
        : `${N}` extends `${infer X extends Digit}`
            ? [0, X]
            : never
    : never;
type AddDigits<N extends Digit, M extends Digit, C extends Digit = 0> = Carry<[...Tuple<N>, ...Tuple<M>, ...Tuple<C>]["length"]>;
type SplitNumber<N extends number | string> = `${N}` extends `${infer X extends Digit}${infer Y}`
    ? [X, ...SplitNumber<Y>]
    : `${N}` extends `${infer X extends Digit}`
        ? [X]
        : [];
type ParseInt<N extends string> = N extends `${infer X extends number}` ? X : never;
type JoinNumberHelper<N> = N extends [infer X extends Digit, ...infer XS extends Digit[]]
    ? `${X}${JoinNumberHelper<XS>}`
    : "";
type JoinNumber<N extends Digit[]> = ParseInt<JoinNumberHelper<N>>;
type PadList<L extends unknown[], N extends number, P = 0, I extends unknown[] = []> = I["length"] extends N
    ? L
    : L[I["length"]] extends undefined
        ? PadList<[P, ...L], N, P, [unknown, ...I]>
        : PadList<L, N, P, [unknown, ...I]>;
type DePadList<L extends unknown[], P = 0> = L extends [P, ...infer XS]
    ? DePadList<XS, P>
    : L;
type AddListsHelper<
    A extends number[],
    B extends number[],
    C extends Digit = 0,
    L = PadList<A, B["length"]>,
    R = PadList<B, A["length"]>
> = L extends [...infer XS extends number[], infer X extends Digit]
    ? R extends [...infer YS extends number[], infer Y extends Digit]
        ? AddDigits<X, Y, C> extends [infer ThisCarry extends Digit, infer ThisDigit extends Digit]
            ? [...AddListsHelper<XS, YS, ThisCarry>, ThisDigit]
            : []
        : []
    : [];
type AddLists<A extends number[], B extends number[]> = DePadList<AddListsHelper<[0, ...A], [0, ...B]>>;
type AddListXTimes<A extends number[], X extends number, O extends number[] = A, I extends unknown[] = [unknown]> = X extends 0
    ? [0]
    : I["length"] extends X
        ? A
        : AddListXTimes<AddLists<A, O>, X, O, [...I, unknown]>;
type Multiply<N extends number, M extends number> = JoinNumber<AddListXTimes<SplitNumber<N>, M>>;
type Abs<N extends number> = `${N}` extends `-${infer X extends number}` ? X : N;
type Square<N extends number, M extends number = Abs<N>> = Multiply<M, M>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<Square<0>, 0>>,
    Expect<Equal<Square<1>, 1>>,
    Expect<Equal<Square<3>, 9>>,
    Expect<Equal<Square<20>, 400>>,
    Expect<Equal<Square<100>, 10000>>,

    // Negative numbers
    Expect<Equal<Square<-2>, 4>>,
    Expect<Equal<Square<-5>, 25>>,
    Expect<Equal<Square<-31>, 961>>,
    Expect<Equal<Square<-50>, 2500>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/27133/answer
    > View solutions: https://tsch.js.org/27133/solutions
    > More Challenges: https://tsch.js.org
*/
