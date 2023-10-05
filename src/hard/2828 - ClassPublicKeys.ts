/*
    2828 - ClassPublicKeys
    -------
    by jiangshan (@jiangshanmeta) #hard #utils

    ### Question

    Implement the generic `ClassPublicKeys<T>` which returns all public keys of a class.

    For example:

    ```ts
    class A {
        public str: string
        protected num: number
        private bool: boolean
        getNum() {
            return Math.random()
        }
    }

    type publicKeys = ClassPublicKeys<A> // 'str' | 'getNum'
    ```

    > View on GitHub: https://tsch.js.org/2828
*/

/* _____________ Your Code Here _____________ */

type ClassPublicKeys<T> = keyof T;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

class A {
    public str: string;

    protected num: number;

    private readonly bool: boolean;

    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
    constructor() {
        this.str = "naive";
        this.num = 19260917;
        this.bool = true;
    }

    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility, class-methods-use-this, @typescript-eslint/explicit-function-return-type
    getNum() {
        return Math.random();
    }
}

export type Cases = [
    Expect<Equal<ClassPublicKeys<A>, "getNum" | "str">>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/2828/answer
    > View solutions: https://tsch.js.org/2828/solutions
    > More Challenges: https://tsch.js.org
*/
