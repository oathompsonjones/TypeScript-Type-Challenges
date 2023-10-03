/*
    29650 - ExtractToObject
    -------
    by Maxim Bazuev (@bazuka5801) #medium #object

    ### Question

    Implement a type that extract prop value to the interface. The type takes the two arguments.
    The output should be an object with the prop values.
      Prop value is object.

      For example

    ```ts
    type Test = { id: '1', myProp: { foo: '2' }}
    type Result = ExtractToObject<Test, 'myProp'> // expected to be { id: '1', foo: '2' }
    ```

    > View on GitHub: https://tsch.js.org/29650
*/

/* _____________ Your Code Here _____________ */

type Prettify<T> = { [K in keyof T]: T[K]; };
type ExtractToObject<T extends object, U extends keyof T> = Prettify<T[U] & {
    [K in keyof T as K extends U ? never : K]: T[K];
}>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface Test1 {
    id: "1";
    myProp: {
        foo: "2";
    };
}

interface TestExpect1 {
    id: "1";
    foo: "2";
}

interface Test2 {
    id: "1";
    prop1: {
        zoo: "2";
    };
    prop2: {
        foo: "4";
    };
}

interface TestExpect2 {
    id: "1";
    prop1: {
        zoo: "2";
    };
    foo: "4";
}

interface Test3 {
    prop1: {
        zoo: "2";
        a: 2;
        b: 4;
        c: 7;
    };
    prop2: {
        foo: "4";
        v: 2;
        d: 4;
        g: 7;
    };
    k: 289;
}

interface TestExpect3 {
    zoo: "2";
    a: 2;
    b: 4;
    c: 7;
    prop2: {
        foo: "4";
        v: 2;
        d: 4;
        g: 7;
    };
    k: 289;
}

interface Test4 {
    id: "1";
    myProp: {
        foo: "2";
    };
}

interface TestExpect4 {
    id: "1";
    myProp: {
        foo: "2";
    };
}

export type Cases = [
    Expect<Equal<ExtractToObject<Test1, "myProp">, TestExpect1>>,
    Expect<Equal<ExtractToObject<Test2, "prop2">, TestExpect2>>,
    Expect<Equal<ExtractToObject<Test3, "prop1">, TestExpect3>>,
    // @ts-expect-error ...
    Expect<Equal<ExtractToObject<Test4, "prop4">, TestExpect4>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/29650/answer
    > View solutions: https://tsch.js.org/29650/solutions
    > More Challenges: https://tsch.js.org
*/
