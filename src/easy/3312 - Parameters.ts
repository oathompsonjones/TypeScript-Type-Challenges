/*
  3312 - Parameters
  -------
  by midorizemi (@midorizemi) #easy #infer #tuple #built-in

  ### Question

  Implement the built-in Parameters<T> generic without using it.

  For example:

  ```ts
  const foo = (arg1: string, arg2: number): void => {}

  type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
  ```

  > View on GitHub: https://tsch.js.org/3312
*/

/* _____________ Your Code Here _____________ */

// ! Note that function arguments are typed as `never[]` instead of `unknown[]`.
// ! Using `any[]` would also work, but we should avoid using `any`.
type MyParameters<T extends (...args: never[]) => unknown> = T extends (...args: infer U) => unknown ? U : never;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const foo = (arg1: string, arg2: number): void => {
    void [arg1, arg2];
};
const bar = (arg1: boolean, arg2: { a: "A"; }): void => {
    void [arg1, arg2];
};
const baz = (): void => {
    void [];
};

export type Cases = [
    Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
    Expect<Equal<MyParameters<typeof bar>, [boolean, { a: "A"; }]>>,
    Expect<Equal<MyParameters<typeof baz>, []>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3312/answer
  > View solutions: https://tsch.js.org/3312/solutions
  > More Challenges: https://tsch.js.org
*/
