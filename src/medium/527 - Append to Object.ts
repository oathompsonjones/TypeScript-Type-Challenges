/*
    527 - Append to object
    -------
    by Andrey Krasovsky (@bre30kra69cs) #medium #object-keys

    ### Question

    Implement a type that adds a new field to the interface. The type takes the three arguments.
    The output should be an object with the new field.

    For example

    ```ts
    type Test = { id: '1' }
    type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
    ```

    > View on GitHub: https://tsch.js.org/527
*/

/* _____________ Your Code Here _____________ */

type AppendToObject<T, U extends PropertyKey, V> = {
    [K in U | keyof T]: K extends keyof T ? T[K] : V;
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface Test1 {
    key: "cat";
    value: "green";
}

interface TestExpect1 {
    key: "cat";
    value: "green";
    home: boolean;
}

interface Test2 {
    key: "dog" | undefined;
    value: "white";
    sun: true;
}

interface TestExpect2 {
    key: "dog" | undefined;
    value: "white";
    sun: true;
    home: 1;
}

interface Test3 {
    key: "cow";
    value: "yellow";
    sun: false;
}

interface TestExpect3 {
    key: "cow";
    value: "yellow";
    sun: false;
    moon: false | undefined;
}

export type Cases = [
    Expect<Equal<AppendToObject<Test1, "home", boolean>, TestExpect1>>,
    Expect<Equal<AppendToObject<Test2, "home", 1>, TestExpect2>>,
    Expect<Equal<AppendToObject<Test3, "moon", false | undefined>, TestExpect3>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/527/answer
    > View solutions: https://tsch.js.org/527/solutions
    > More Challenges: https://tsch.js.org
*/
