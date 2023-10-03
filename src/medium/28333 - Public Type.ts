/*
    28333 - Public Type
    -------
    by KaiKai (@kaikaibenkai) #medium #object-keys

    ### Question

    Remove the key starting with `_` from given type `T`.

    > View on GitHub: https://tsch.js.org/28333
*/

/* _____________ Your Code Here _____________ */

type PublicType<T extends object> = {
    [K in keyof T as K extends `_${string}` ? never : K]: T[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<PublicType<{ a: number; }>, { a: number; }>>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    Expect<Equal<PublicType<{ _b: bigint | string; }>, {}>>,
    Expect<Equal<PublicType<{ readonly c?: number; }>, { readonly c?: number; }>>,
    Expect<Equal<PublicType<{ d: string; _e: string; }>, { d: string; }>>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    Expect<Equal<PublicType<{ _f: () => bigint[]; }>, {}>>,
    Expect<Equal<PublicType<{ g: "_g"; }>, { g: "_g"; }>>,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Expect<Equal<PublicType<{ __h: number; i: unknown; }>, { i: unknown; }>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/28333/answer
    > View solutions: https://tsch.js.org/28333/solutions
    > More Challenges: https://tsch.js.org
*/
