/*
    17 - Currying 1
    -------
    by Anthony Fu (@antfu) #hard #array

    ### Question

    > TypeScript 4.0 is recommended in this challenge

    [Currying](https://en.wikipedia.org/wiki/Currying) is the technique of converting a function
    that takes multiple arguments into a sequence of functions that each take a single argument.

    For example:

    ```ts
    const add = (a: number, b: number) => a + b
    const three = add(1, 2)

    const curriedAdd = Currying(add)
    const five = curriedAdd(2)(3)
    ```

    The function passed to `Currying` may have multiple arguments, you need to correctly type it.

    In this challenge, the curried function only accept one argument at a time.
    Once all the argument is assigned, it should return its result.

    > View on GitHub: https://tsch.js.org/17
*/

/* _____________ Your Code Here _____________ */

type Curried<T> = T extends (...args: infer Args) => infer Return
    ? Args["length"] extends 0 | 1
        ? T
        // Preserves the names of the parameters
        : Args extends [unknown, ...infer Rest]
            ? Args extends [...infer First, ...Rest]
                ? (...args: First) => Curried<(...args: Rest) => Return>
                : Return
            : never
    : never;
// eslint-disable-next-line @typescript-eslint/ban-types
declare function Currying<T extends Function>(fn: T): Curried<T>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

/* eslint-disable @typescript-eslint/no-unused-vars */
const curried1 = Currying((_a: string, _b: number, _c: boolean) => true);
// eslint-disable-next-line max-params
const curried2 = Currying((_a: string, _b: number, _c: boolean, _d: boolean, _e: boolean, _f: string, _g: boolean) => true);
const curried3 = Currying(() => true);
/* eslint-enable @typescript-eslint/no-unused-vars */

export type Cases = [
    Expect<Equal<typeof curried1,
    (_a: string) => (_b: number) => (_c: boolean) => true
    >>,
    Expect<Equal<typeof curried2,
    (_a: string) => (_b: number) => (_c: boolean) => (_d: boolean) => (_e: boolean) => (_f: string) => (_g: boolean) => true
    >>,
    Expect<Equal<typeof curried3, () => true>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/17/answer
    > View solutions: https://tsch.js.org/17/solutions
    > More Challenges: https://tsch.js.org
*/
