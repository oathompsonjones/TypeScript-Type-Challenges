/*
    898 - Includes
    -------
    by null (@kynefuk) #easy #array

    ### Question

    Implement the JavaScript `Array.includes` function in the type system. A type takes the two arguments.
    The output should be a boolean `true` or `false`.

    For example:

    ```ts
    type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
    ```

    > View on GitHub: https://tsch.js.org/898
*/

/* _____________ Your Code Here _____________ */

type Includes<T extends readonly unknown[], U> = T extends [infer Head, ...infer Tail]
    ? (<A>() => A extends Head ? 1 : 2) extends (<A>() => A extends U ? 1 : 2)
        ? true
        : Includes<Tail, U>
    : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">, true>>,
    Expect<Equal<Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">, false>>,
    Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
    Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
    Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
    Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    Expect<Equal<Includes<[{}], { a: "A"; }>, false>>,
    Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
    Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
    Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
    Expect<Equal<Includes<[{ a: "A"; }], { readonly a: "A"; }>, false>>,
    Expect<Equal<Includes<[{ readonly a: "A"; }], { a: "A"; }>, false>>,
    Expect<Equal<Includes<[1], 1 | 2>, false>>,
    Expect<Equal<Includes<[1 | 2], 1>, false>>,
    Expect<Equal<Includes<[null], undefined>, false>>,
    Expect<Equal<Includes<[undefined], null>, false>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/898/answer
    > View solutions: https://tsch.js.org/898/solutions
    > More Challenges: https://tsch.js.org
*/
