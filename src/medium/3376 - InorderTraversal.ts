/*
    3376 - InorderTraversal
    -------
    by jiangshan (@jiangshanmeta) #medium #object

    ### Question

    Implement the type version of binary tree inorder traversal.

    For example:

    ```typescript
    const tree1 = {
        val: 1,
        left: null,
        right: {
            val: 2,
            left: {
                val: 3,
                left: null,
                right: null,
            },
            right: null,
        },
    } as const

    type A = InorderTraversal<typeof tree1> // [1, 3, 2]
    ```

    > View on GitHub: https://tsch.js.org/3376
*/

/* _____________ Your Code Here _____________ */

interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}
type InorderTraversal<
    T extends TreeNode | null,
    Nodes extends Array<TreeNode["val"]> = [],
    // eslint-disable-next-line @typescript-eslint/ban-types
    N extends TreeNode = T & {}
> = T extends null
    ? []
    : [
        ...(N["left"] extends null
            ? []
            : InorderTraversal<N["left"], Nodes>),
        N["val"],
        ...(N["right"] extends null
            ? []
            : InorderTraversal<N["right"], Nodes>)
    ];

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const tree1 = {
    left: null,
    right: {
        left: {
            left: null,
            right: null,
            val: 3
        },
        right: null,
        val: 2
    },
    val: 1
} as const;

const tree2 = {
    left: null,
    right: null,
    val: 1
} as const;

const tree3 = {
    left: {
        left: null,
        right: null,
        val: 2
    },
    right: null,
    val: 1
} as const;

const tree4 = {
    left: null,
    right: {
        left: null,
        right: null,
        val: 2
    },
    val: 1
} as const;

export type Cases = [
    Expect<Equal<InorderTraversal<null>, []>>,
    Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
    Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
    Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
    Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/3376/answer
    > View solutions: https://tsch.js.org/3376/solutions
    > More Challenges: https://tsch.js.org
*/

