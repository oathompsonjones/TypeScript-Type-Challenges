
/*
    9989 - Count Element Number To Object
    -------
    by 凤之兮原 (@kongmingLatern) #medium

    ### Question

    With type ``CountElementNumberToObject``, get the number of occurrences of every item from an
    array and return them in an object. For example:

    ~~~ts
    type Simple1 = CountElementNumberToObject<[]> // return {}
    type Simple2 = CountElementNumberToObject<[1,2,3,4,5]>
    // return {
    //   1: 1,
    //   2: 1,
    //   3: 1,
    //   4: 1,
    //   5: 1
    // }

    type Simple3 = CountElementNumberToObject<[1,2,3,4,5,[1,2,3]]>
    // return {
    //   1: 2,
    //   2: 2,
    //   3: 2,
    //   4: 1,
    //   5: 1
    // }
    ~~~

    > View on GitHub: https://tsch.js.org/9989
*/

/* _____________ Your Code Here _____________ */

type InputArray = InputArray[] | PropertyKey;
type Flatten<T extends InputArray> = T extends [infer L extends InputArray, ...infer R extends InputArray[]]
    ? L extends unknown[]
        ? [...Flatten<L>, ...Flatten<R>]
        : [L, ...Flatten<R>]
    : [];
type Count<T extends PropertyKey[], U extends PropertyKey, I extends unknown[] = []> = T extends []
    ? I["length"]
    : T extends [infer L, ...infer R extends PropertyKey[]]
        ? L extends U
            ? Count<R, U, [...I, unknown]>
            : Count<R, U, I>
        : never;
type CountElementNumberToObject<T extends InputArray> = {
    [K in Flatten<T>[number]]: Count<Flatten<T>, K>;
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";
/* eslint-disable @typescript-eslint/naming-convention */
export type Cases = [
    Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
        1: 1;
        2: 1;
        3: 1;
        4: 1;
        5: 1;
    }
    >>,
    Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
        1: 2;
        2: 2;
        3: 2;
        4: 1;
        5: 1;
    }>>,
    Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
        1: 3;
        2: 3;
        3: 2;
        4: 3;
        5: 1;
    }>>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
    Expect<Equal<CountElementNumberToObject<["1", "2", "0"]>, {
        0: 1;
        1: 1;
        2: 1;
    }>>,
    Expect<Equal<CountElementNumberToObject<["a", "b", ["c", ["d"]]]>, {
        "a": 1;
        "b": 1;
        "c": 1;
        "d": 1;
    }>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/9989/answer
    > View solutions: https://tsch.js.org/9989/solutions
    > More Challenges: https://tsch.js.org
*/
