/*
    14188 - Run-length encoding
    -------
    by Hen Hedymdeith (@alfaproxima) #hard

    ### Question

    Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
    Also make a decoder for that string.

    > View on GitHub: https://tsch.js.org/14188
*/

/* _____________ Your Code Here _____________ */

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace RLE {
    export type Encode<S extends string, L extends string = "", I extends unknown[] = []> = S extends `${infer F}${infer R}`
        ? L extends ""
            ? Encode<R, F, [unknown]>
            : F extends L
                ? Encode<R, F, [...I, unknown]>
                : `${I["length"] extends 1 ? "" : I["length"]}${L}${Encode<R, F, [unknown]>}`
        : `${I["length"] extends 1 ? "" : I["length"]}${L}`;
    type Repeat<S extends string, N extends number, I extends unknown[] = []> = I["length"] extends N
        ? ""
        : `${S}${Repeat<S, N, [...I, unknown]>}`;
    type ExtractLeadingDigits<S extends string> = S extends `${infer N extends number}${infer R}`
        ? `${N}${ExtractLeadingDigits<R>}`
        : "";
    type ParseInt<S extends string> = S extends `${infer N extends number}`
        ? N
        : never;
    export type Decode<
        S extends string,
        N extends number = ParseInt<ExtractLeadingDigits<S>>
    > = S extends `${N}${infer L}${infer R}`
        ? `${Repeat<L, N>}${Decode<R>}`
        : S extends `${infer L}${infer R}`
            ? `${L}${Decode<R>}`
            : "";
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    // Raw string -> encoded string
    Expect<Equal<RLE.Encode<"AAABCCXXXXXXY">, "3AB2C6XY">>,

    // Encoded string -> decoded string
    Expect<Equal<RLE.Decode<"3AB2C6XY">, "AAABCCXXXXXXY">>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/14188/answer
    > View solutions: https://tsch.js.org/14188/solutions
    > More Challenges: https://tsch.js.org
*/

