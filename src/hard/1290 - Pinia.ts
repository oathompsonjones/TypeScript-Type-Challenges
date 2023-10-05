/*
    1290 - Pinia
    -------
    by Pig Fang (@g-plane) #hard #this #vue

    ### Question

    Create a type-level function whose types is similar to [Pinia](https://github.com/posva/pinia) library.
    You don't need to implement function actually, just adding types.

    ### Overview

    This function receive only one parameter whose type is an object. The object contains 4 properties:

    - `id` - just a string (required)
    - `state` - a function which will return an object as store's state (required)
    - `getters` - an object with methods which is similar to Vue's computed values or Vuex's getters, and details are below (optional)
    - `actions` - an object with methods which can do side effects and mutate state, and details are below (optional)

    ### Getters

    When you define a store like this:

    ```typescript
    const store = defineStore({
      // ...other required fields
      getters: {
        getSomething() {
          return 'xxx'
        }
      }
    })
    ```

    And you should use it like this:

    ```typescript
    store.getSomething
    ```

    instead of:

    ```typescript
    store.getSomething()  // error
    ```

    Additionally, getters can access state and/or other getters via `this`, but state is read-only.

    ### Actions

    When you define a store like this:

    ```typescript
    const store = defineStore({
      // ...other required fields
      actions: {
        doSideEffect() {
          this.xxx = 'xxx'
          return 'ok'
        }
      }
    })
    ```

    Using it is just to call it:

    ```typescript
    const returnValue = store.doSideEffect()
    ```

    Actions can return any value or return nothing, and it can receive any number of parameters with different types.
    Parameters types and return type can't be lost, which means type-checking must be available at call side.

    State can be accessed and mutated via `this`. Getters can be accessed via `this` but they're read-only.

    > View on GitHub: https://tsch.js.org/1290
*/

/* _____________ Your Code Here _____________ */

type Getters<G> = {
    readonly [K in keyof G]: G[K] extends (...args: never[]) => infer R ? R : never;
};
declare function defineStore<A extends Record<string, (...args: never[]) => unknown>, G extends object, S extends object>(store: {
    id: string;
    state: () => S;
    getters?: G & ThisType<A & Getters<G> & Readonly<S>>;
    actions?: A & ThisType<A & Getters<G> & S>;
}): { init: () => void; reset: () => true; } & (A & Getters<G> & S);

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const store = defineStore({
    actions: {
        increment(step: number = 1) {
            this.num += step;
        },
        init() {
            this.reset();
            this.increment();
        },
        reset() {
            this.num = 0;

            // @ts-expect-error ...
            this.parsedNum = 0;

            return true;
        },
        setNum(value: number) {
            this.num = value;
        }
    },
    getters: {
        parsedNum() {
            return parseInt(this.stringifiedNum, 10);
        },
        stringifiedNum() {
            // @ts-expect-error ...
            this.num += 1;

            return this.num.toString();
        }
    },
    id: "",
    state: () => ({
        num: 0,
        str: ""
    })
});

// @ts-expect-error ...
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
store.nopeStateProp;
// @ts-expect-error ...
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
store.nopeGetter;
// @ts-expect-error ...
store.stringifiedNum();
store.init();
// @ts-expect-error ...
store.init(0);
store.increment();
store.increment(2);
// @ts-expect-error ...
store.setNum();
// @ts-expect-error ...
store.setNum("3");
store.setNum(3);
const r = store.reset();

export type Cases = [
    Expect<Equal<typeof store.num, number>>,
    //                         ^?
    Expect<Equal<typeof store.str, string>>,
    //                         ^?
    Expect<Equal<typeof store.stringifiedNum, string>>,
    //                         ^?
    Expect<Equal<typeof store.parsedNum, number>>,
    //                         ^?
    Expect<Equal<typeof r, true>>
    //                  ^?
];

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/1290/answer
    > View solutions: https://tsch.js.org/1290/solutions
    > More Challenges: https://tsch.js.org
*/
