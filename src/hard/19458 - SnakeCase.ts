/*
    19458 - SnakeCase
    -------
    by Gabriel Vergnaud (@gvergnaud) #hard #template-literal #string

    ### Question

    Create a `SnakeCase<T>` generic that turns a string formatted in **camelCase** into a string formatted in **snake_case**.

    A few examples:

    ```ts
    type res1 = SnakeCase<"hello">; // => "hello"
    type res2 = SnakeCase<"userName">; // => "user_name"
    type res3 = SnakeCase<"getElementById">; // => "get_element_by_id"
    ```

    > View on GitHub: https://tsch.js.org/19458
*/

/* _____________ Your Code Here _____________ */

type SnakeCase<T extends string> = T extends `${infer F}${infer R}`
    ? F extends Uppercase<F>
        ? `${F extends "" ? "" : "_"}${Lowercase<F>}${SnakeCase<R>}`
        : `${F}${SnakeCase<R>}`
    : T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<SnakeCase<"hello">, "hello">>,
    Expect<Equal<SnakeCase<"userName">, "user_name">>,
    Expect<Equal<SnakeCase<"getElementById">, "get_element_by_id">>,
    Expect<Equal<SnakeCase<"getElementByClassNames" | "getElementById">, "get_element_by_class_names" | "get_element_by_id">>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/19458/answer
    > View solutions: https://tsch.js.org/19458/solutions
    > More Challenges: https://tsch.js.org
*/
