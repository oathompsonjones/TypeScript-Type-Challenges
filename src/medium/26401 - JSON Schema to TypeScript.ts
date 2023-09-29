/*
    26401 - JSON Schema to TypeScript
    -------
    by null (@aswinsvijay) #medium #JSON

    ### Question

    Implement the generic type JSONSchema2TS which will return the TypeScript type corresponding to the given JSON schema.

    Additional challenges to handle:
    * additionalProperties
    * oneOf, anyOf, allOf
    * minLength and maxLength

    > View on GitHub: https://tsch.js.org/26401
*/

/* _____________ Your Code Here _____________ */

type Schema = {
    type: "array";
    items?: Schema;
} | {
    type: "boolean";
} | {
    type: "number";
    enum?: number[];
} | {
    type: "object";
    properties?: Record<string, Schema>;
    required?: string[];
} | {
    type: "string";
    enum?: string[];
};
type MergeIntersection<T> = { [K in keyof T]: T[K]; };
type JSONSchema2TS<T extends Schema> = T["type"] extends "string"
    ? "enum" extends keyof T
        ? T["enum"] extends string[]
            ? T["enum"][number]
            : never
        : string
    : T["type"] extends "number"
        ? "enum" extends keyof T
            ? T["enum"] extends number[]
                ? T["enum"][number]
                : never
            : number
        : T["type"] extends "boolean"
            ? boolean
            : T["type"] extends "array"
                ? "items" extends keyof T
                    ? T["items"] extends Schema
                        ? Array<JSONSchema2TS<T["items"]>>
                        : never
                    : unknown[]
                : T["type"] extends "object"
                    ? "properties" extends keyof T
                        ? T["properties"] extends Record<string, Schema>
                            ? "required" extends keyof T
                                ? T["required"] extends string[]
                                    ? MergeIntersection<{
                                        [K in keyof T["properties"] as K extends T["required"][number]
                                            ? K
                                            : never]: JSONSchema2TS<T["properties"][K]>;
                                    } & {
                                        [K in keyof T["properties"] as K extends T["required"][number]
                                            ? never
                                            : K]?: JSONSchema2TS<T["properties"][K]>;
                                    }>
                                    : never
                                : { [K in keyof T["properties"]]?: JSONSchema2TS<T["properties"][K]>; }
                            : never
                        : Record<string, unknown>
                    : never;


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

// + Primitive types
type Type1 = JSONSchema2TS<{
    type: "string";
}>;
type Expected1 = string;
export type Result1 = Expect<Equal<Type1, Expected1>>;

type Type2 = JSONSchema2TS<{
    type: "number";
}>;
type Expected2 = number;
export type Result2 = Expect<Equal<Type2, Expected2>>;

type Type3 = JSONSchema2TS<{
    type: "boolean";
}>;
type Expected3 = boolean;
export type Result3 = Expect<Equal<Type3, Expected3>>;
// - Primitive types

// + Enums
type Type4 = JSONSchema2TS<{
    type: "string";
    enum: ["a", "b", "c"];
}>;
type Expected4 = "a" | "b" | "c";
export type Result4 = Expect<Equal<Type4, Expected4>>;

type Type5 = JSONSchema2TS<{
    type: "number";
    enum: [1, 2, 3];
}>;
type Expected5 = 1 | 2 | 3;
export type Result5 = Expect<Equal<Type5, Expected5>>;
// - Enums

// + Object types
type Type6 = JSONSchema2TS<{
    type: "object";
}>;
type Expected6 = Record<string, unknown>;
export type Result6 = Expect<Equal<Type6, Expected6>>;

type Type7 = JSONSchema2TS<{
    type: "object";
    // eslint-disable-next-line @typescript-eslint/ban-types
    properties: {};
}>;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Expected7 {}
export type Result7 = Expect<Equal<Type7, Expected7>>;

type Type8 = JSONSchema2TS<{
    type: "object";
    properties: {
        a: {
            type: "string";
        };
    };
}>;
interface Expected8 {
    a?: string;
}
export type Result8 = Expect<Equal<Type8, Expected8>>;
// - Object types

// + Arrays
type Type9 = JSONSchema2TS<{
    type: "array";
}>;
type Expected9 = unknown[];
export type Result9 = Expect<Equal<Type9, Expected9>>;

type Type10 = JSONSchema2TS<{
    type: "array";
    items: {
        type: "string";
    };
}>;
type Expected10 = string[];
export type Result10 = Expect<Equal<Type10, Expected10>>;

type Type11 = JSONSchema2TS<{
    type: "array";
    items: {
        type: "object";
    };
}>;
type Expected11 = Array<Record<string, unknown>>;
export type Result11 = Expect<Equal<Type11, Expected11>>;
// - Arrays

// + Mixed types
type Type12 = JSONSchema2TS<{
    type: "object";
    properties: {
        a: {
            type: "string";
            enum: ["a", "b", "c"];
        };
        b: {
            type: "number";
        };
    };
}>;
interface Expected12 {
    a?: "a" | "b" | "c";
    b?: number;
}
export type Result12 = Expect<Equal<Type12, Expected12>>;

type Type13 = JSONSchema2TS<{
    type: "array";
    items: {
        type: "object";
        properties: {
            a: {
                type: "string";
            };
        };
    };
}>;
type Expected13 = Array<{
    a?: string;
}>;
export type Result13 = Expect<Equal<Type13, Expected13>>;
// - Mixed types

// + Required fields
type Type14 = JSONSchema2TS<{
    type: "object";
    properties: {
        req1: { type: "string"; };
        req2: {
            type: "object";
            properties: {
                a: {
                    type: "number";
                };
            };
            required: ["a"];
        };
        add1: { type: "string"; };
        add2: {
            type: "array";
            items: {
                type: "number";
            };
        };
    };
    required: ["req1", "req2"];
}>;
interface Expected14 {
    req1: string;
    req2: { a: number; };
    add1?: string;
    add2?: number[];
}
export type Result14 = Expect<Equal<Type14, Expected14>>;
// - Required fields

/* _____________ Further Steps _____________ */
/*
    > Share your solutions: https://tsch.js.org/26401/answer
    > View solutions: https://tsch.js.org/26401/solutions
    > More Challenges: https://tsch.js.org
*/
