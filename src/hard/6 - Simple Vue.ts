/*
    6 - Simple Vue
    -------
    by Anthony Fu (@antfu) #hard #this #application #vue

    ### Question

    Implement a simpiled version of a Vue-like typing support.

    By providing a function name `SimpleVue` (similar to `Vue.extend` or `defineComponent`),
    it should properly infer the `this` type inside computed and methods.

    In this challenge, we assume that SimpleVue take an Object with `data`, `computed` and `methods` fields as it's only argument,

    - `data` is a simple function that returns an object that exposes the context `this`,
    but you won't be accessible to other computed values or methods.

    - `computed` is an Object of functions that take the context as `this`, doing some calculation and returns the result.
    The computed results should be exposed to the context as the plain return values instead of functions.

    - `methods` is an Object of functions that take the context as `this` as well.
    Methods can access the fields exposed by `data`, `computed` as well as other `methods`.
    The different between `computed` is that `methods` exposed as functions as-is.

    The type of `SimpleVue`'s return value can be arbitrary.

    ```ts
    const instance = SimpleVue({
        data() {
            return {
                firstname: 'Type',
                lastname: 'Challenges',
                amount: 10,
            }
        },
        computed: {
            fullname() {
                return this.firstname + ' ' + this.lastname
            }
        },
        methods: {
            hi() {
                alert(this.fullname.toLowerCase())
            }
        }
    })
    ```

    > View on GitHub: https://tsch.js.org/6
*/

/* _____________ Your Code Here _____________ */

type ComputedValueType<C> = {
    [P in keyof C]: C[P] extends () => infer R ? R : never;
};

declare function SimpleVue<D, C, M>(options: {
    data: (this: never) => D;
    computed: C & ThisType<D>;
    methods: M & ThisType<ComputedValueType<C> & D & M>;
}): unknown;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

SimpleVue({
    computed: {
        fullname() {
            return `${this.firstname} ${this.lastname}`;
        }
    },
    data() {
        // @ts-expect-error ...
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.firstname;
        // @ts-expect-error ...
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.getRandom();
        // @ts-expect-error ...
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.data();

        return {
            amount: 10,
            firstname: "Type",
            lastname: "Challenges"
        };
    },
    methods: {
        getRandom() {
            return Math.random();
        },
        hi() {
            /* eslint-disable no-alert */
            alert(this.amount);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            alert(this.fullname.toLowerCase());
            alert(this.getRandom());
            /* eslint-enable no-alert */
        },
        test() {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { fullname } = this;
            const cases: [Expect<Equal<typeof fullname, string>>] = [true];
            void cases;
        }
    }
});

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/6/answer
    > View solutions: https://tsch.js.org/6/solutions
    > More Challenges: https://tsch.js.org
*/
