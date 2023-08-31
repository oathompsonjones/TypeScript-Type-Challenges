/*
    189 - Awaited
    -------
    by Maciej Sikora (@maciejsikora) #easy #promise #built-in

    ### Question

    If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type?

    For example: if we have `Promise<ExampleType>` how to get ExampleType?

    ```ts
    type ExampleType = Promise<string>

    type Result = MyAwaited<ExampleType> // string
    ```

    > This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4)
    by [@maciejsikora](https://github.com/maciejsikora)

    > View on GitHub: https://tsch.js.org/189
*/

/* _____________ Your Code Here _____________ */

// TODO Fix this so that it doesn't use `any`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer P>
    ? P extends PromiseLike<unknown>
        ? MyAwaited<P>
        : P
    : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type X = Promise<string>;
type Y = Promise<{ field: number; }>;
type Z = Promise<Promise<number | string>>;
type Z1 = Promise<Promise<Promise<boolean | string>>>;
interface T {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    then: (onfulfilled: (arg: number) => any) => any;
}

export type Cases = [
    Expect<Equal<MyAwaited<X>, string>>,
    Expect<Equal<MyAwaited<Y>, { field: number; }>>,
    Expect<Equal<MyAwaited<Z>, number | string>>,
    Expect<Equal<MyAwaited<Z1>, boolean | string>>,
    Expect<Equal<MyAwaited<T>, number>>
];

// @ts-expect-error ...
export type Error = MyAwaited<number>;

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/189/answer
    > View solutions: https://tsch.js.org/189/solutions
    > More Challenges: https://tsch.js.org
*/
