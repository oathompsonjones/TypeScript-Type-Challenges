/*
    4260 - AllCombinations
    -------
    by 蛭子屋双六 (@sugoroku-y) #medium #template-literal #infer #union

    ### Question

    Implement type ```AllCombinations<S>``` that return all combinations of strings which use characters from ```S``` at most once.

    For example:

    ```ts
    type AllCombinations_ABC = AllCombinations<'ABC'>;
    // should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
    ```

    > View on GitHub: https://tsch.js.org/4260
*/

/* _____________ Your Code Here _____________ */

type StrToUnion<S extends string> = S extends `${infer F}${infer R}`
    ? F | StrToUnion<R>
    : never;

type AllCombinations<S extends string, T extends string = StrToUnion<S>> = [T] extends [never]
    ? ""
    : { [K in T]: `${K}${AllCombinations<T extends K ? never : T>}` }[T] | "";

type Test = AllCombinations<"AB">;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

export type Cases = [
    Expect<Equal<AllCombinations<"">, "">>,
    Expect<Equal<AllCombinations<"A">, "" | "A">>,
    Expect<Equal<AllCombinations<"AB">, "" | "A" | "AB" | "B" | "BA">>,
    Expect<Equal<AllCombinations<"ABC">, "" | "A" | "AB" | "ABC" | "AC" | "ACB" | "B" | "BA" | "BAC" | "BC" | "BCA" | "C" | "CA"
    | "CAB" | "CB" | "CBA">>,
    Expect<Equal<AllCombinations<"ABCD">, "" | "A" | "AB" | "ABC" | "ABCD" | "ABD" | "ABDC" | "AC" | "ACB" | "ACBD" | "ACD" | "ACDB"
    | "AD" | "ADB" | "ADBC" | "ADC" | "ADCB" | "B" | "BA" | "BAC" | "BACD" | "BAD" | "BADC" | "BC" | "BCA" | "BCAD" | "BCD" | "BCDA"
    | "BD" | "BDA" | "BDAC" | "BDC" | "BDCA" | "C" | "CA" | "CAB" | "CABD" | "CAD" | "CADB" | "CB" | "CBA" | "CBAD" | "CBD" | "CBDA"
    | "CD" | "CDA" | "CDAB" | "CDB" | "CDBA" | "D" | "DA" | "DAB" | "DABC" | "DAC" | "DACB" | "DB" | "DBA" | "DBAC" | "DBC" | "DBCA"
    | "DC" | "DCA" | "DCAB" | "DCB" | "DCBA">>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/4260/answer
    > View solutions: https://tsch.js.org/4260/solutions
    > More Challenges: https://tsch.js.org
*/
