/*
    151 - Query String Parser
    -------
    by Pig Fang (@g-plane) #extreme #template-literal

    ### Question

    You're required to implement a type-level parser to parse URL query string into a object literal type.

    Some detailed requirements:

    - Value of a key in query string can be ignored but still be parsed to `true`.
    For example, `'key'` is without value, so the parser result is `{ key: true }`.
    - Duplicated keys must be merged into one. If there are different values with the same key,
    values must be merged into a tuple type.
    - When a key has only one value, that value can't be wrapped into a tuple type.
    - If values with the same key appear more than once, it must be treated as once.
    For example, `key=value&key=value` must be treated as `key=value` only.

    > View on GitHub: https://tsch.js.org/151
*/

/* _____________ Your Code Here _____________ */

type GetKeys<S extends string> = S extends `${infer K}&${infer R}`
    ? K extends `${infer P}=${string}`
        ? GetKeys<R> | P
        : GetKeys<R> | K
    : S extends `${infer K}=${string}`
        ? K
        : S;
type GetValue<S extends string, K extends string, T extends unknown[] = []> = S extends `${infer P}&${infer R}`
    ? P extends `${K}=${infer V}`
        ? GetValue<R, K, V extends T[number] ? T : [...T, V]>
        : P extends K
            ? GetValue<R, K, [...T, true]>
            : GetValue<R, K, T>
    : S extends `${K}=${infer V}`
        ? V extends T[number] ? T : [...T, V]
        : S extends K
            ? true extends T[number] ? T : [...T, true]
            : T;
type ParseQueryString<S extends string> = {
    [K in GetKeys<S> as K extends "" ? never : K]: GetValue<S, K>["length"] extends 1
        ? GetValue<S, K>[0]
        : GetValue<S, K>;
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    // eslint-disable-next-line @typescript-eslint/ban-types
    Expect<Equal<ParseQueryString<"">, {}>>,
    Expect<Equal<ParseQueryString<"k1">, { k1: true; }>>,
    Expect<Equal<ParseQueryString<"k1&k1">, { k1: true; }>>,
    Expect<Equal<ParseQueryString<"k1&k2">, { k1: true; k2: true; }>>,
    Expect<Equal<ParseQueryString<"k1=v1">, { k1: "v1"; }>>,
    Expect<Equal<ParseQueryString<"k1=v1&k1=v2">, { k1: ["v1", "v2"]; }>>,
    Expect<Equal<ParseQueryString<"k1=v1&k2=v2">, { k1: "v1"; k2: "v2"; }>>,
    Expect<Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2">, { k1: ["v1", "v2"]; k2: "v2"; }>>,
    Expect<Equal<ParseQueryString<"k1=v1&k2">, { k1: "v1"; k2: true; }>>,
    Expect<Equal<ParseQueryString<"k1=v1&k1=v1">, { k1: "v1"; }>>,
    Expect<Equal<ParseQueryString<"k1=v1&k1=v2&k1=v1">, { k1: ["v1", "v2"]; }>>,
    Expect<Equal<ParseQueryString<"k1=v1&k2=v1&k1=v2&k1=v1">, { k1: ["v1", "v2"]; k2: "v1"; }>>,
    Expect<Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2&k1=v3">, { k1: ["v1", "v2", "v3"]; k2: "v2"; }>>,
    Expect<Equal<ParseQueryString<"k1=v1&k1">, { k1: ["v1", true]; }>>,
    Expect<Equal<ParseQueryString<"k1&k1=v1">, { k1: [true, "v1"]; }>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/151/answer
    > View solutions: https://tsch.js.org/151/solutions
    > More Challenges: https://tsch.js.org
*/
