/*
    29785 - Deep Omit
    -------
    by bowen (@jiaowoxiaobala) #medium #omit object-keys deep

    ### Question

    Implement a type`DeepOmit`, Like Utility types
    [Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys), A type takes two arguments.

    For example:

    ```ts
    type obj = {
        person: {
            name: string;
            age: {
                value: number
            }
        }
    }

    type test1 = DeepOmit<obj, 'person'>    // {}
    type test2 = DeepOmit<obj, 'person.name'> // { person: { age: { value: number } } }
    type test3 = DeepOmit<obj, 'name'> // { person: { name: string; age: { value: number } } }
    type test4 = DeepOmit<obj, 'person.age.value'> // { person: { name: string; age: {} } }
    ```

    > View on GitHub: https://tsch.js.org/29785
*/

/* _____________ Your Code Here _____________ */

type Prettify<T> = { [K in keyof T]: T[K]; };
type DeepOmit<T, U extends string> = Prettify<U extends `${infer K}.${infer R}`
    ? K extends keyof T
        ? Omit<T, K> & { [P in K]: DeepOmit<T[K], R> }
        : T
    : U extends keyof T
        ? Omit<T, U>
        : T>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface Obj {
    person: {
        name: string;
        age: {
            value: number;
        };
    };
}

export type Cases = [
    // eslint-disable-next-line @typescript-eslint/ban-types
    Expect<Equal<DeepOmit<Obj, "person">, {}>>,
    Expect<Equal<DeepOmit<Obj, "person.name">, { person: { age: { value: number; }; }; }>>,
    Expect<Equal<DeepOmit<Obj, "name">, Obj>>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    Expect<Equal<DeepOmit<Obj, "person.age.value">, { person: { name: string; age: {}; }; }>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/29785/answer
    > View solutions: https://tsch.js.org/29785/solutions
    > More Challenges: https://tsch.js.org
*/
