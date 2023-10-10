/*
    9775 - Capitalize Nest Object Keys
    -------
    by MayanDev (@Mayandev) #hard #object #array

    ### Question

    Capitalize the key of the object, and if the value is an array, iterate through the objects in the array.

    > View on GitHub: https://tsch.js.org/9775
*/

/* _____________ Your Code Here _____________ */

type CapitalizeObjectKeysInArray<T extends object[]> = {
    [K in keyof T]: CapitalizeNestObjectKeys<T[K]>
};
type CapitalizeNestObjectKeys<T> = {
    [K in keyof T as Capitalize<K & string>]: T[K] extends object[]
        ? CapitalizeObjectKeysInArray<T[K]>
        : T[K] extends object
            ? CapitalizeNestObjectKeys<T[K]>
            : T[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface Foo {
    foo: string;
    bars: [{
        foo: string;
    }];
}

interface Bar {
    Foo: string;
    Bars: [{
        Foo: string;
    }];
}

export type Cases = [
    Expect<Equal<Bar, CapitalizeNestObjectKeys<Foo>>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/9775/answer
    > View solutions: https://tsch.js.org/9775/solutions
    > More Challenges: https://tsch.js.org
*/
