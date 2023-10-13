/*
    28143 - OptionalUndefined
    -------
    by Jesus The Hun (@JesusTheHun) #hard

    ### Question

    Implement the util type `OptionalUndefined<T, Props>` that turns all the properties of `T` that
    can be `undefined`, into optional properties. In addition, a second -optional- generic `Props`
    can be passed to restrict the properties that can be altered.

    ```ts
    OptionalUndefined<{ value: string | undefined, description: string }>
    // { value?: string | undefined; description: string }

    OptionalUndefined<{ value: string | undefined, description: string | undefined, author: string | undefined },
    'description' | 'author'>
    // { value: string | undefined; description?: string | undefined, author?: string | undefined }
    ```

    > View on GitHub: https://tsch.js.org/28143
*/

/* _____________ Your Code Here _____________ */

type Prettify<T> = { [K in keyof T]: T[K] };
type OptionalUndefined<T, Props extends keyof T = keyof T> = Prettify<{
    [K in keyof T as undefined extends T[K] ? K extends Props ? never : K : K]: T[K];
} & {
    [K in Props as undefined extends T[K] ? K : never]?: T[K];
}>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<
    OptionalUndefined<{ value: string | undefined; }, "value">,
    { value?: string | undefined; }>
    >,
    Expect<Equal<
    OptionalUndefined<{ value: string; desc: string; }, "value">,
    { value: string; desc: string; }>
    >,
    Expect<Equal<
    OptionalUndefined<{ value: string | undefined; desc: string; }, "value">,
    { value?: string; desc: string; }>
    >,
    Expect<Equal<
    OptionalUndefined<{ value: string | undefined; desc: string | undefined; }, "value">,
    { value?: string | undefined; desc: string | undefined; }>
    >,
    Expect<Equal<
    OptionalUndefined<{ value: string | undefined; desc: string; }, "desc" | "value">,
    { value?: string; desc: string; }>
    >,
    Expect<Equal<
    OptionalUndefined<{ value: string | undefined; desc: string | undefined; }>,
    { value?: string; desc?: string; }>
    >,
    Expect<Equal<
    OptionalUndefined<{ value?: string; }, "value">,
    { value?: string; }>
    >,
    Expect<Equal<
    OptionalUndefined<{ value?: string; }>,
    { value?: string; }>
    >
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/28143/answer
    > View solutions: https://tsch.js.org/28143/solutions
    > More Challenges: https://tsch.js.org
*/
