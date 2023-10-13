/*
    274 - Integers Comparator
    -------
    by Pig Fang (@g-plane) #extreme #template-literal #math

    ### Question

    Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

    - If `a` is greater than `b`, type should be `Comparison.Greater`.
    - If `a` and `b` are equal, type should be `Comparison.Equal`.
    - If `a` is lower than `b`, type should be `Comparison.Lower`.

    **Note that `a` and `b` can be positive integers or negative integers or zero,
    even one is positive while another one is negative.**

    > View on GitHub: https://tsch.js.org/274
*/

/* _____________ Your Code Here _____________ */

enum Comparison {
    Greater = 0,
    Equal = 1,
    Lower = 2
}

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
/* eslint-disable @typescript-eslint/naming-convention */
interface Compare {
    "0": {
        "0": Comparison.Equal;
        "1": Comparison.Lower;
        "2": Comparison.Lower;
        "3": Comparison.Lower;
        "4": Comparison.Lower;
        "5": Comparison.Lower;
        "6": Comparison.Lower;
        "7": Comparison.Lower;
        "8": Comparison.Lower;
        "9": Comparison.Lower;
    };
    "1": {
        "0": Comparison.Greater;
        "1": Comparison.Equal;
        "2": Comparison.Lower;
        "3": Comparison.Lower;
        "4": Comparison.Lower;
        "5": Comparison.Lower;
        "6": Comparison.Lower;
        "7": Comparison.Lower;
        "8": Comparison.Lower;
        "9": Comparison.Lower;
    };
    "2": {
        "0": Comparison.Greater;
        "1": Comparison.Greater;
        "2": Comparison.Equal;
        "3": Comparison.Lower;
        "4": Comparison.Lower;
        "5": Comparison.Lower;
        "6": Comparison.Lower;
        "7": Comparison.Lower;
        "8": Comparison.Lower;
        "9": Comparison.Lower;
    };
    "3": {
        "0": Comparison.Greater;
        "1": Comparison.Greater;
        "2": Comparison.Greater;
        "3": Comparison.Equal;
        "4": Comparison.Lower;
        "5": Comparison.Lower;
        "6": Comparison.Lower;
        "7": Comparison.Lower;
        "8": Comparison.Lower;
        "9": Comparison.Lower;
    };
    "4": {
        "0": Comparison.Greater;
        "1": Comparison.Greater;
        "2": Comparison.Greater;
        "3": Comparison.Greater;
        "4": Comparison.Equal;
        "5": Comparison.Lower;
        "6": Comparison.Lower;
        "7": Comparison.Lower;
        "8": Comparison.Lower;
        "9": Comparison.Lower;
    };
    "5": {
        "0": Comparison.Greater;
        "1": Comparison.Greater;
        "2": Comparison.Greater;
        "3": Comparison.Greater;
        "4": Comparison.Greater;
        "5": Comparison.Equal;
        "6": Comparison.Lower;
        "7": Comparison.Lower;
        "8": Comparison.Lower;
        "9": Comparison.Lower;
    };
    "6": {
        "0": Comparison.Greater;
        "1": Comparison.Greater;
        "2": Comparison.Greater;
        "3": Comparison.Greater;
        "4": Comparison.Greater;
        "5": Comparison.Greater;
        "6": Comparison.Equal;
        "7": Comparison.Lower;
        "8": Comparison.Lower;
        "9": Comparison.Lower;
    };
    "7": {
        "0": Comparison.Greater;
        "1": Comparison.Greater;
        "2": Comparison.Greater;
        "3": Comparison.Greater;
        "4": Comparison.Greater;
        "5": Comparison.Greater;
        "6": Comparison.Greater;
        "7": Comparison.Equal;
        "8": Comparison.Lower;
        "9": Comparison.Lower;
    };
    "8": {
        "0": Comparison.Greater;
        "1": Comparison.Greater;
        "2": Comparison.Greater;
        "3": Comparison.Greater;
        "4": Comparison.Greater;
        "5": Comparison.Greater;
        "6": Comparison.Greater;
        "7": Comparison.Greater;
        "8": Comparison.Equal;
        "9": Comparison.Lower;
    };
    "9": {
        "0": Comparison.Greater;
        "1": Comparison.Greater;
        "2": Comparison.Greater;
        "3": Comparison.Greater;
        "4": Comparison.Greater;
        "5": Comparison.Greater;
        "6": Comparison.Greater;
        "7": Comparison.Greater;
        "8": Comparison.Greater;
        "9": Comparison.Equal;
    };
}
/* eslint-enable @typescript-eslint/naming-convention */
type CompareDigits<T extends string, U extends string> = T extends Digit
    ? U extends Digit
        ? Compare[T][U]
        : never
    : never;
type CompareEachDigit<A extends string, B extends string> = A extends `${infer A1}${infer A2}`
    ? B extends `${infer B1}${infer B2}`
        ? CompareDigits<A1, B1> extends Comparison.Equal
            ? CompareEachDigit<A2, B2>
            : CompareDigits<A1, B1>
        : never
    : never;
type IsNegative<N extends number | string> = `${N}` extends `-${string}`
    ? true
    : false;
type Abs<N extends number | string> = `${N}` extends `-${infer R}`
    ? R
    : `${N}`;
type StripLeadingZeros<S extends string> = S extends `-${infer R}`
    ? `-${StripLeadingZeros<R>}`
    : S extends `0${infer R}`
        ? StripLeadingZeros<R>
        : S extends ""
            ? "0"
            : S;
type StringLength<S extends string, R extends unknown[] = []> = S extends `${string}${infer R1}`
    ? StringLength<R1, [...R, unknown]>
    : R["length"];
type StringIndex<S extends string, N extends number, I extends unknown[] = []> = S extends `${infer L}${infer R}`
    ? I["length"] extends N
        ? L
        : StringIndex<R, N, [unknown, ...I]>
    : undefined;
type PadString<S extends string, N extends number, P extends string = "0", I extends unknown[] = []> = I["length"] extends N
    ? S
    : StringIndex<S, I["length"]> extends undefined
        ? PadString<`${P}${S}`, N, P, [unknown, ...I]>
        : PadString<S, N, P, [unknown, ...I]>;
type Comparator<
    A extends number,
    B extends number,
    A1 extends string = PadString<`${A}`, StringLength<StripLeadingZeros<`${B}`>>>,
    B1 extends string = PadString<`${B}`, StringLength<StripLeadingZeros<`${A}`>>>
> = A1 extends B1
    ? Comparison.Equal
    : IsNegative<A1> extends true
        ? IsNegative<B1> extends true
            ? Comparator<number, number, Abs<B1>, Abs<A1>>
            : Comparison.Lower
        : IsNegative<B1> extends true
            ? Comparison.Greater
            : StringLength<A1> extends StringLength<B1>
                ? CompareEachDigit<A1, B1>
                : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
    Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
    Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
    Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
    Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
    Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
    Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
    Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
    Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
    Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
    Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
    Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
    Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
    Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
    Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

    Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
    Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
    Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
    Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
    Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
    Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

    // Extra tests if you like to challenge yourself!
    Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
    Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
    Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
    Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
    Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
    Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/274/answer
    > View solutions: https://tsch.js.org/274/solutions
    > More Challenges: https://tsch.js.org
*/
