/*
    21106 - Combination key type
    -------
    by Nauxscript (@Nauxscript) #medium

    ### Question

    1. Combine multiple modifier keys, but the same modifier key combination cannot appear.
    2. In the `ModifierKeys` provided, the priority of the previous value is higher than the latter value;
    that is, `cmd ctrl` is OK, but `ctrl cmd` is not allowed.

    > View on GitHub: https://tsch.js.org/21106
*/

/* _____________ Your Code Here _____________ */

type Combs<T extends string[]> = T extends [infer L extends string, ...infer R extends string[]]
    ? Combs<R> | `${L} ${R[number]}`
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type ModifierKeys = ["cmd", "ctrl", "opt", "fn"];
type CaseTypeOne = "cmd ctrl" | "cmd fn" | "cmd opt" | "ctrl fn" | "ctrl opt" | "opt fn";

export type Cases = [
    Expect<Equal<Combs<ModifierKeys>, CaseTypeOne>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/21106/answer
    > View solutions: https://tsch.js.org/21106/solutions
    > More Challenges: https://tsch.js.org
*/
