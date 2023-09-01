/*
    1097 - IsUnion
    -------
    by null (@bencor) #medium #union

    ### Question

    Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

    For example:

    ```ts
    type case1 = IsUnion<string> // false
    type case2 = IsUnion<string | number> // true
    type case3 = IsUnion<[string | number]> // false
    ```

    > View on GitHub: https://tsch.js.org/1097
*/

/* _____________ Your Code Here _____________ */

type IsUnion<T, U extends T = T> = [T] extends [never]
    ? false
    : T extends unknown
        ? [U] extends [T]
            ? false
            : true
        : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<IsUnion<string>, false>>,
    Expect<Equal<IsUnion<number | string>, true>>,
    Expect<Equal<IsUnion<"a" | "b" | "c" | "d">, true>>,
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    Expect<Equal<IsUnion<"" | null | undefined | void>, true>>,
    Expect<Equal<IsUnion<{ a: number; } | { a: string; }>, true>>,
    Expect<Equal<IsUnion<{ a: number | string; }>, false>>,
    Expect<Equal<IsUnion<[number | string]>, false>>,
    // Cases where T resolves to a non-union type.
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    Expect<Equal<IsUnion<never | string>, false>>,
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    Expect<Equal<IsUnion<string | unknown>, false>>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-redundant-type-constituents
    Expect<Equal<IsUnion<any | string>, false>>,
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    Expect<Equal<IsUnion<string | "a">, false>>,
    Expect<Equal<IsUnion<never>, false>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/1097/answer
    > View solutions: https://tsch.js.org/1097/solutions
    > More Challenges: https://tsch.js.org
*/
