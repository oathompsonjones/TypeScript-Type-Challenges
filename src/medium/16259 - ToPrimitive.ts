/*
    16259 - ToPrimitive
    -------
    by 前端子鱼 (@mwc) #medium

    ### Question

    Convert a property of type literal (label type) to a primitive type.

    For example

    ```typescript
    type X = {
        name: 'Tom',
        age: 30,
        married: false,
        addr: {
            home: '123456',
            phone: '13111111111'
        }
    }

    type Expected = {
        name: string,
        age: number,
        married: boolean,
        addr: {
            home: string,
            phone: string
        }
    }
    type Todo = ToPrimitive<X> // should be same as `Expected`
    ```

    > View on GitHub: https://tsch.js.org/16259
*/

/* _____________ Your Code Here _____________ */

type ToPrimitive<T extends object> = {
    [K in keyof T]: T[K] extends string
        ? string
        : T[K] extends number
            ? number
            : T[K] extends boolean
                ? boolean
                : T[K] extends symbol
                    ? symbol
                    : T[K] extends (...args: never[]) => unknown
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        ? Function
                        : T[K] extends object
                            ? ToPrimitive<T[K]>
                            : T[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface PersonInfo {
    name: "Tom";
    age: 30;
    married: false;
    addr: {
        home: "123456";
        phone: "13111111111";
    };
    hobbies: ["sing", "dance"];
    readonlyArr: readonly ["test"];
    fn: () => unknown;
}

interface ExpectedResult {
    name: string;
    age: number;
    married: boolean;
    addr: {
        home: string;
        phone: string;
    };
    hobbies: [string, string];
    readonlyArr: readonly [string];
    // eslint-disable-next-line @typescript-eslint/ban-types
    fn: Function;
}

export type Cases = [
    Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/16259/answer
    > View solutions: https://tsch.js.org/16259/solutions
    > More Challenges: https://tsch.js.org
*/
