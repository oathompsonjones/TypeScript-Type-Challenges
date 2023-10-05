/*
    956 - DeepPick
    -------
    by hiroya iizuka (@hiroyaiizuka) #hard #deep

    ### Question

    Implement a type DeepPick, that extends Utility types `Pick`.
    A type takes two arguments.


    For example:

    ```ts
    type obj = {
      name: 'hoge',
      age: 20,
      friend: {
        name: 'fuga',
        age: 30,
        family: {
          name: 'baz',
          age: 1
        }
      }
    }

    type T1 = DeepPick<obj, 'name'>   // { name : 'hoge' }
    type T2 = DeepPick<obj, 'name' | 'friend.name'>  // { name : 'hoge' } & { friend: { name: 'fuga' }}
    type T3 = DeepPick<obj, 'name' | 'friend.name' |  'friend.family.name'>  // { name : 'hoge' } &  { friend: { name: 'fuga' }} &
    { friend: { family: { name: 'baz' }}}

    ```

    > View on GitHub: https://tsch.js.org/956
*/

/* _____________ Your Code Here _____________ */

type UnionToIntersection<U> = (
    U extends unknown
        ? (_: U) => unknown
        : never
) extends (_: infer I) => void
    ? I
    : never;
type DeepPickHelper<T, K> = K extends `${infer F}.${infer R}`
    ? F extends keyof T
        ? { [P in F]: DeepPick<T[P], R>; }
        : never
    : K extends keyof T
        ? { [P in K]: T[P]; }
        : never;
type DeepPick<T, U extends string> = UnionToIntersection<U extends infer K
    ? DeepPickHelper<T, K>
    : never>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface Obj {
    a: number;
    b: string;
    c: boolean;
    obj: {
        d: number;
        e: string;
        f: boolean;
        obj2: {
            g: number;
            h: string;
            i: boolean;
        };
    };
    obj3: {
        j: number;
        k: string;
        l: boolean;
    };
}

export type Cases = [
    Expect<Equal<DeepPick<Obj, "">, unknown>>,
    Expect<Equal<DeepPick<Obj, "a">, { a: number; }>>,
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    Expect<Equal<DeepPick<Obj, "" | "a">, unknown & { a: number; }>>,
    Expect<Equal<DeepPick<Obj, "a" | "obj.e">, { a: number; } & { obj: { e: string; }; }>>,
    Expect<Equal<DeepPick<Obj, "a" | "obj.e" | "obj.obj2.i">, { a: number; } & { obj: { e: string; }; } &
    { obj: { obj2: { i: boolean; }; }; }>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/956/answer
    > View solutions: https://tsch.js.org/956/solutions
    > More Challenges: https://tsch.js.org
*/
