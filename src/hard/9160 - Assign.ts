/*
    9160 - Assign
    -------
    by zhangxiaofan (@workkk98) #hard #object #array

    ### Question

    You have a target object and a source array of objects.
    You need to copy property from source to target, if it has the same property as the source,
    you should always keep the source property, and drop the target property. (Inspired by the `Object.assign` API)

    ### example

    ```ts
    type Target = {
      a: 'a'
    }

    type Origin1 = {
      b: 'b'
    }

    // type Result = Assign<Target, [Origin1]>
    type Result = {
      a: 'a'
      b: 'b'
    }
    ```


    ```ts
    type Target = {
      a: 'a'
      d: {
        hi: 'hi'
      }
    }

    type Origin1 = {
      a: 'a1',
      b: 'b'
    }


    type Origin2 = {
      b: 'b2',
      c: 'c'
    }

    type Answer = {
       a: 'a1',
       b: 'b2',
       c: 'c'
       d: {
          hi: 'hi'
      }
    }
    ```

    > View on GitHub: https://tsch.js.org/9160
*/

/* _____________ Your Code Here _____________ */

type KeyofList<T extends object[]> = T extends [infer L, ...infer R extends object[]]
    ? KeyofList<R> | keyof L
    : never;

type GetField<T extends object[], K extends PropertyKey> = T extends [...infer L extends object[], infer R]
    ? K extends keyof R
        ? R[K]
        : GetField<L, K>
    : never;

type FilterToObjectArray<T extends unknown[]> = T extends [infer L, ...infer R]
    ? L extends object
        ? [L, ...FilterToObjectArray<R>]
        : FilterToObjectArray<R>
    : [];

type Assign<T extends object, S extends unknown[], U extends object[] = FilterToObjectArray<S>> = {
    [K in KeyofList<U> | keyof T]: GetField<U, K> extends never
        ? T[K]
        : GetField<U, K>;
};

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

// Case1
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Case1Target {}

interface Case1Origin1 {
    a: "a";
}

interface Case1Origin2 {
    b: "b";
}

interface Case1Origin3 {
    c: "c";
}

interface Case1Answer {
    a: "a";
    b: "b";
    c: "c";
}

// Case2
interface Case2Target {
    a: [1, 2, 3];
}

interface Case2Origin1 {
    a: {
        a1: "a1";
    };
}

interface Case2Origin2 {
    b: [2, 3, 3];
}

interface Case2Answer {
    a: {
        a1: "a1";
    };
    b: [2, 3, 3];
}

// Case3
interface Case3Target {
    a: 1;
    b: ["b"];
}

interface Case3Origin1 {
    a: 2;
    b: {
        b: "b";
    };
    c: "c1";
}

interface Case3Origin2 {
    a: 3;
    c: "c2";
    d: true;
}

interface Case3Answer {
    a: 3;
    b: {
        b: "b";
    };
    c: "c2";
    d: true;
}

// Case 4
interface Case4Target {
    a: 1;
    b: ["b"];
}

interface Case4Answer {
    a: 1;
    b: ["b"];
}

export type Cases = [
    Expect<Equal<Assign<Case1Target, [Case1Origin1, Case1Origin2, Case1Origin3]>, Case1Answer>>,
    Expect<Equal<Assign<Case2Target, [Case2Origin1, Case2Origin2]>, Case2Answer>>,
    Expect<Equal<Assign<Case3Target, [Case3Origin1, Case3Origin2]>, Case3Answer>>,
    Expect<Equal<Assign<Case4Target, ["", 0]>, Case4Answer>>
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/9160/answer
    > View solutions: https://tsch.js.org/9160/solutions
    > More Challenges: https://tsch.js.org
*/
