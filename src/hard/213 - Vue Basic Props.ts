/*
    213 - Vue Basic Props
    -------
    by Anthony Fu (@antfu) #hard #vue #application

    ### Question

    **This challenge continues from [6 - Simple Vue](//tsch.js.org/6), you should finish that one first,
    and modify your code based on it to start this challenge**.

    In addition to the Simple Vue, we are now having a new `props` field in the options.
    This is a simplified version of Vue's `props` option. Here are some of the rules.

    `props` is an object containing each field as the key of the real props injected into `this`.
    The injected props will be accessible in all the context including `data`, `computed`, and `methods`.

    A prop will be defined either by a constructor or an object with a `type` field containing constructor(s).

    For example

    ```js
    props: {
        foo: Boolean
    }
    // or
    props: {
        foo: { type: Boolean }
    }
    ```

    should be inferred to `type Props = { foo: boolean }`.

    When passing multiple constructors, the type should be inferred to a union.

    ```ts
    props: {
        foo: { type: [Boolean, Number, String] }
    }
    // -->
    type Props = { foo: boolean | number | string }
    ```

    When an empty object is passed, the key should be inferred to `any`.

    For more specified cases, check out the Test Cases section.

    > `required`, `default`, and array props in Vue are not considered in this challenge.

    > View on GitHub: https://tsch.js.org/213
*/

/* _____________ Your Code Here _____________ */

type ComputedValueType<C> = {
    [P in keyof C]: C[P] extends () => infer R ? R : never;
};

type TypeMap<T> = T extends StringConstructor
    ? string
    : T extends NumberConstructor
        ? number
        : T extends BooleanConstructor
            ? boolean
            : T extends RegExpConstructor
                ? RegExp
                : T extends new (...args: never[]) => infer R
                    ? R
                    : T extends Array<infer U>
                        ? U
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        : any;

type Props<P> = {
    [K in keyof P]: P[K] extends { type: infer R; }
        ? R extends Array<infer U>
            ? TypeMap<U>
            : TypeMap<R>
        : TypeMap<P[K]>;
};

declare function VueBasicProps<D, C, M, P>(options: {
    data: (this: Props<P>) => D;
    computed: C & ThisType<D>;
    methods: M & ThisType<ComputedValueType<C> & D & M & Props<P>>;
    props: P;
}): P;

/* _____________ Test Cases _____________ */
import type { Debug, Equal, Expect, IsAny } from "@type-challenges/utils";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class ClassA { }

VueBasicProps({
    computed: {
        fullname() {
            return `${this.firstname} ${this.lastname}`;
        }
    },
    data(this) {
        type PropsType = Debug<typeof this>;
        // @ts-expect-error Unused type
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        type Cases = [
            Expect<IsAny<PropsType["propA"]>>,
            Expect<Equal<PropsType["propB"], string>>,
            Expect<Equal<PropsType["propC"], boolean>>,
            Expect<Equal<PropsType["propD"], ClassA>>,
            Expect<Equal<PropsType["propE"], number | string>>,
            Expect<Equal<PropsType["propF"], RegExp>>
        ];

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
            // eslint-disable-next-line no-alert
            alert(this.fullname.toLowerCase());
            // eslint-disable-next-line no-alert
            alert(this.getRandom());
        },
        test() {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { fullname, propA, propB, propC, propD, propE, propF } = this;
            // @ts-expect-error Unused type
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            type Cases = [
                Expect<Equal<typeof fullname, string>>,
                Expect<IsAny<typeof propA>>,
                Expect<Equal<typeof propB, string>>,
                Expect<Equal<typeof propC, boolean>>,
                Expect<Equal<typeof propD, ClassA>>,
                Expect<Equal<typeof propE, number | string>>,
                Expect<Equal<typeof propF, RegExp>>
            ];
        }
    },
    props: {
        propA: {},
        propB: { type: String },
        propC: { type: Boolean },
        propD: { type: ClassA },
        propE: { type: [String, Number] },
        propF: RegExp
    }
});

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/213/answer
    > View solutions: https://tsch.js.org/213/solutions
    > More Challenges: https://tsch.js.org
*/
