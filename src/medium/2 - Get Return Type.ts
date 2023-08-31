/*
    2 - Get Return Type
    -------
    by Anthony Fu (@antfu) #medium #infer #built-in

    ### Question

    Implement the built-in `ReturnType<T>` generic without using it.

    For example

    ```ts
    const fn = (v: boolean) => {
      if (v)
        return 1
      else
        return 2
    }

    type a = MyReturnType<typeof fn> // should be "1 | 2"
    ```

    > View on GitHub: https://tsch.js.org/2
*/

/* _____________ Your Code Here _____________ */

// ! Note that function arguments are typed as `never[]` instead of `unknown[]`.
// ! Using `any[]` would also work, but we should avoid using `any`.
type MyReturnType<T extends (...args: never[]) => unknown> = T extends (...args: never[]) => infer U ? U : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<string, MyReturnType<() => string>>>,
    Expect<Equal<123, MyReturnType<() => 123>>>,
    Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
    Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
    Expect<Equal<() => "foo", MyReturnType<() => () => "foo">>>,
    Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
    Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>
];

interface ComplexObject {
    a: [12, "foo"];
    bar: "hello";
    prev: () => number;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fn = (v: boolean) => (v ? 1 : 2);
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars
const fn1 = (v: boolean, _w: unknown) => (v ? 1 : 2);

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/2/answer
    > View solutions: https://tsch.js.org/2/solutions
    > More Challenges: https://tsch.js.org
*/
