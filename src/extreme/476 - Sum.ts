/*
    476 - Sum
    -------
    by null (@uid11) #extreme #math #template-literal

    ### Question

    Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string.
    Numbers can be specified as a string, number, or bigint.

    For example,

    ```ts
    type T0 = Sum<2, 3> // '5'
    type T1 = Sum<'13', '21'> // '34'
    type T2 = Sum<'328', 7> // '335'
    type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
    ```

    > View on GitHub: https://tsch.js.org/476
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
type SplitNumber<N extends bigint | number | string> = `${N}` extends `${infer X extends Digit}${infer Y}`
    ? [X, ...SplitNumber<Y>]
    : `${N}` extends `${infer X extends Digit}`
        ? [X]
        : [];
type JoinNumber<N> = N extends [infer X extends Digit, ...infer XS extends Digit[]]
    ? `${X}${JoinNumber<XS>}`
    : "";
type PadList<L extends unknown[], N extends number, P = 0, I extends unknown[] = []> = I["length"] extends N
    ? L
    : L[I["length"]] extends undefined
        ? PadList<[P, ...L], N, P, [unknown, ...I]>
        : PadList<L, N, P, [unknown, ...I]>;
type DePadList<L extends unknown[], P = 0> = L["length"] extends 1
    ? L
    : L extends [P, ...infer XS]
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
type Sum<
    A extends bigint | number | string,
    B extends bigint | number | string,
    A1 extends number[] = SplitNumber<A>,
    B1 extends number[] = SplitNumber<B>
> = JoinNumber<AddLists<A1, B1>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<Sum<2, 3>, "5">>,
    Expect<Equal<Sum<"13", "21">, "34">>,
    Expect<Equal<Sum<"328", 7>, "335">>,
    Expect<Equal<Sum<1_000_000_000_000n, "123">, "1000000000123">>,
    Expect<Equal<Sum<9999, 1>, "10000">>,
    Expect<Equal<Sum<4325234, "39532">, "4364766">>,
    Expect<Equal<Sum<728, 0>, "728">>,
    Expect<Equal<Sum<"0", 213>, "213">>,
    Expect<Equal<Sum<0, "0">, "0">>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/476/answer
    > View solutions: https://tsch.js.org/476/solutions
    > More Challenges: https://tsch.js.org
*/
