/*
    1130 - ReplaceKeys
    -------
    by 贱贱 (@lullabyjune) #medium #object-keys

    ### Question

    Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing,
    A type takes three arguments.

    For example:

    ```ts
    type NodeA = {
      type: "A"
      name: string
      flag: number
    }

    type NodeB = {
      type: "B"
      id: number
      flag: number
    }

    type NodeC = {
      type: "C"
      name: string
      flag: number
    }

    type Nodes = NodeA | NodeB | NodeC

    type ReplacedNodes = ReplaceKeys<
      Nodes,
      "name" | "flag",
      { name: number; flag: string }
    > // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string}
    // would replace name from string to number, replace flag from number to string.

    type ReplacedNotExistKeys = ReplaceKeys<Nodes, "name", { aa: number }> // {type: 'A', name: never, flag: number} | NodeB |
    {type: 'C', name: never, flag: number} // would replace name to never
    ```

    > View on GitHub: https://tsch.js.org/1130
*/

/* _____________ Your Code Here _____________ */

type ReplaceKeys<U, T extends PropertyKey, Y> = {
    [K in keyof U]: K extends T | keyof Y
        ? K extends keyof Y
            ? Y[K]
            : never
        : U[K];
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

interface NodeA {
    type: "A";
    name: string;
    flag: number;
}

interface NodeB {
    type: "B";
    id: number;
    flag: number;
}

interface NodeC {
    type: "C";
    name: string;
    flag: number;
}

interface ReplacedNodeA {
    type: "A";
    name: number;
    flag: string;
}

interface ReplacedNodeB {
    type: "B";
    id: number;
    flag: string;
}

interface ReplacedNodeC {
    type: "C";
    name: number;
    flag: string;
}

interface NoNameNodeA {
    type: "A";
    flag: number;
    name: never;
}

interface NoNameNodeC {
    type: "C";
    flag: number;
    name: never;
}

type Nodes = NodeA | NodeB | NodeC;
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC;
type NodesNoName = NodeB | NoNameNodeA | NoNameNodeC;

export type Cases = [
    Expect<Equal<ReplaceKeys<Nodes, "flag" | "name", { name: number; flag: string; }>, ReplacedNodes>>,
    Expect<Equal<ReplaceKeys<Nodes, "name", { aa: number; }>, NodesNoName>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/1130/answer
    > View solutions: https://tsch.js.org/1130/solutions
    > More Challenges: https://tsch.js.org
*/
