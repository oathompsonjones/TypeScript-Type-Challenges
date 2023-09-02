/* eslint-disable @typescript-eslint/consistent-type-definitions */
/*
    1367 - Remove Index Signature
    -------
    by hiroya iizuka (@hiroyaiizuka) #medium #object-keys

    ### Question

    Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

    For example:

    ```ts
    type Foo = {
      [key: string]: any
      foo(): void
    }

    type A = RemoveIndexSignature<Foo> // expected { foo(): void }
    ```

    > View on GitHub: https://tsch.js.org/1367
*/

/* _____________ Your Code Here _____________ */

type RemoveIndexSignature<T extends Record<PropertyKey, unknown>> = {
    [K in keyof T as string extends K
        ? never
        : number extends K
            ? never
            : symbol extends K
                ? never
                : K
    ]: T[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    foo: () => void;
};

type Bar = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: number]: any;
    bar: () => void;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    0: string;
};

const foobar = Symbol("foobar");
type FooBar = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: symbol]: any;
    [foobar]: () => void;
};

type Baz = {
    bar: () => void;
    baz: string;
};

export type Cases = [
    Expect<Equal<RemoveIndexSignature<Foo>, { foo: () => void; }>>,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Expect<Equal<RemoveIndexSignature<Bar>, { bar: () => void; 0: string; }>>,
    Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar]: () => void; }>>,
    Expect<Equal<RemoveIndexSignature<Baz>, { bar: () => void; baz: string; }>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/1367/answer
    > View solutions: https://tsch.js.org/1367/solutions
    > More Challenges: https://tsch.js.org
*/
