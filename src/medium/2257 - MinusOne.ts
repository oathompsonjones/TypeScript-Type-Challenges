/*
    2257 - MinusOne
    -------
    by Mustafo Faiz (@fayzzzm) #medium #math

    ### Question

    Given a number (always positive) as a type. Your type should return the number decreased by one.

    For example:

    ```ts
    type Zero = MinusOne<1> // 0
    type FiftyFour = MinusOne<55> // 54
    ```

    > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

type ParseInt<T extends string> = T extends `0${infer U}`
    ? U extends ""
        ? 0
        : ParseInt<U>
    : T extends `${infer U extends number}`
        ? U
        : never;
type ReverseString<T extends string> = T extends `${infer L}${infer R}`
    ? `${ReverseString<R>}${L}`
    : "";
type MinusOne<T extends number> = T extends 0
    ? -1
    : ReverseString<`${T}`> extends `${infer L}${infer R}`
        ? L extends "0"
            ? ParseInt<`${MinusOne<ParseInt<ReverseString<R>>>}9`>
            : ParseInt<`${ReverseString<R>}${["", "0", "1", "2", "3", "4", "5", "6", "7", "8"][ParseInt<L>]}`>
        : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<MinusOne<1>, 0>>,
    Expect<Equal<MinusOne<55>, 54>>,
    Expect<Equal<MinusOne<3>, 2>>,
    Expect<Equal<MinusOne<100>, 99>>,
    Expect<Equal<MinusOne<1101>, 1100>>,
    Expect<Equal<MinusOne<0>, -1>>,
    Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/2257/answer
    > View solutions: https://tsch.js.org/2257/solutions
    > More Challenges: https://tsch.js.org
*/
