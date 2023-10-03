/*
    89 - Required Keys
    -------
    by yituan (@yi-tuan) #hard #utils

    ### Question

    Implement the advanced util type `RequiredKeys<T>`, which picks all the required keys into a union.

    For example

    ```ts
    type Result = RequiredKeys<{ foo: number; bar?: string }>;
    // expected to be “foo”
    ```

    > View on GitHub: https://tsch.js.org/89
*/

/* _____________ Your Code Here _____________ */

type RequiredKeys<T> = keyof {
    [K in keyof T as T[K] extends { [P in keyof T]-?: T[P]; }[K] ? K : never]: T[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<RequiredKeys<{ a: number; b?: string; }>, "a">>,
    Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined; }>, "a">>,
    Expect<Equal<RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null; }>, "a" | "c" | "d">>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    Expect<Equal<RequiredKeys<{}>, never>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/89/answer
    > View solutions: https://tsch.js.org/89/solutions
    > More Challenges: https://tsch.js.org
*/
