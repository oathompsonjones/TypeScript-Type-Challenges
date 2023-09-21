/*
    8767 - Combination
    -------
    by Homyee King (@HomyeeKing) #medium #array #application #string

    ### Question

    Given an array of strings, do Permutation & Combination.
    It's also useful for the prop types like video
    [controlsList](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList)

    ```ts
    // expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar"
    // | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
    type Keys = Combination<['foo', 'bar', 'baz']>
    ```

    > View on GitHub: https://tsch.js.org/8767
*/

/* _____________ Your Code Here _____________ */

type ArrToUnion<T extends string[]> = T extends [infer F, ...infer R]
    ? R extends string[]
        ? ArrToUnion<R> | F
        : never
    : never;
type Join<T extends unknown[]> = T extends [infer L extends string, ...infer R]
    ? R extends []
        ? L
        : R extends string[]
            ? `${L} ${Join<R>}`
            : never
    : never;
type CombinationHelper<T extends string[], U extends string = ArrToUnion<T>> = T extends []
    ? []
    : { [K in U]: [K, ...CombinationHelper<U extends K ? [] : [U]>] }[U];
type Combination<T extends string[]> = Join<CombinationHelper<T>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<Combination<["foo", "bar", "baz"]>,
    "bar baz foo" | "bar baz" | "bar foo baz" | "bar foo" | "bar" | "baz bar foo" | "baz bar"
    | "baz foo bar" | "baz foo" | "baz" | "foo bar baz" | "foo bar" | "foo baz bar" | "foo baz" | "foo">>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/8767/answer
    > View solutions: https://tsch.js.org/8767/solutions
    > More Challenges: https://tsch.js.org
*/
