/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

type ParseInt<T extends string> = T extends `${infer U extends number}`
    ? U
    : never;
type TrimZeros<T extends string> = T extends "0"
    ? T
    : T extends `0${infer U}`
        ? TrimZeros<U>
        : T;
type Reverse<T extends string> = T extends `${infer X}${infer Y}`
    ? `${Reverse<Y>}${X}`
    : "";
type MinusOneHelper<T extends string> = T extends `${infer X extends number}${infer Y}`
    ? X extends 0
        ? `9${MinusOneHelper<Y>}`
        : `${[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8][X]}${Y}`
    : "";
type MinusOne<T extends number> = ParseInt<TrimZeros<Reverse<MinusOneHelper<Reverse<`${T}`>>>>>;
type GreaterThanHelper<T extends number, U extends number> = T extends U
    ? true
    : T extends 0
        ? false
        : GreaterThanHelper<MinusOne<T>, U>;
type GreaterThan<T extends number, U extends number> = T extends U
    ? false
    : U extends 0
        ? true
        : GreaterThanHelper<T, U>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<GreaterThan<1, 0>, true>>,
    Expect<Equal<GreaterThan<5, 4>, true>>,
    Expect<Equal<GreaterThan<4, 5>, false>>,
    Expect<Equal<GreaterThan<0, 0>, false>>,
    Expect<Equal<GreaterThan<10, 9>, true>>,
    Expect<Equal<GreaterThan<20, 20>, false>>,
    Expect<Equal<GreaterThan<10, 100>, false>>,
    Expect<Equal<GreaterThan<111, 11>, true>>,
    Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
