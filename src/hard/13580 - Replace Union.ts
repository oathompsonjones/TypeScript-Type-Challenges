/*
  13580 - Replace Union
  -------
  by Konstantin Barabanov (@crutch12) #hard

  ### Question

  Given an `union of types` and `array of type pairs` to replace (`[[string, number], [Date, null]]`),
  return a new union replaced with the `type pairs`.

  > View on GitHub: https://tsch.js.org/13580
*/

/* _____________ Your Code Here _____________ */

type UnionReplace<T, U extends Array<[unknown, unknown]>> = U extends [
    infer L extends [unknown, unknown],
    ...infer R extends Array<[unknown, unknown]>
]
    ? UnionReplace<T extends L[0] ? L[1] : T, R>
    : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    // String -> null
    Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

    // String -> null
    // eslint-disable-next-line @typescript-eslint/ban-types
    Expect<Equal<UnionReplace<number | string, [[string, null], [Date, Function]]>, number | null>>,

    // Date -> string; Function -> undefined
    // eslint-disable-next-line @typescript-eslint/ban-types
    Expect<Equal<UnionReplace<Date | Function | object, [[Date, string], [Function, undefined]]>, object | string | undefined>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/13580/answer
    > View solutions: https://tsch.js.org/13580/solutions
    > More Challenges: https://tsch.js.org
*/
