/*
    645 - Diff
    -------
    by ZYSzys (@ZYSzys) #medium #object

    ### Question

    Get an `Object` that is the difference between `O` & `O1`

    > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

type Diff<T, U> = {
    [K in keyof (T & U) as K extends keyof (T | U) ? never : K]: (T & U)[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface Foo {
    name: string;
    age: string;
}
interface Bar {
    name: string;
    age: string;
    gender: number;
}
interface Coo {
    name: string;
    gender: number;
}

export type Cases = [
    Expect<Equal<Diff<Foo, Bar>, { gender: number; }>>,
    Expect<Equal<Diff<Bar, Foo>, { gender: number; }>>,
    Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number; }>>,
    Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number; }>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/645/answer
    > View solutions: https://tsch.js.org/645/solutions
    > More Challenges: https://tsch.js.org
*/
