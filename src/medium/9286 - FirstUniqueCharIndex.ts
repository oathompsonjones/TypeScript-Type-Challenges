/*
    9286 - FirstUniqueCharIndex
    -------
    by jiangshan (@jiangshanmeta) #medium #string

    ### Question

    Given a string s, find the first non-repeating character in it and return its index.
    If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

    > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */

type FirstUniqueCharIndex<T extends string, U extends string = T, I extends unknown[] = []> = U extends `${infer L}${infer R}`
    ? T extends `${string}${L}${string}${L}${string}`
        ? FirstUniqueCharIndex<T, R, [...I, unknown]>
        : I["length"]
    : -1;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
    Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
    Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
    Expect<Equal<FirstUniqueCharIndex<"">, -1>>,
    Expect<Equal<FirstUniqueCharIndex<"aaa">, -1>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/9286/answer
    > View solutions: https://tsch.js.org/9286/solutions
    > More Challenges: https://tsch.js.org
*/
