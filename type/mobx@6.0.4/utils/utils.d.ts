export declare const assign: {
    <T, U>(target: T, source: U): T & U;
    <T_1, U_1, V>(target: T_1, source1: U_1, source2: V): T_1 & U_1 & V;
    <T_2, U_2, V_1, W>(target: T_2, source1: U_2, source2: V_1, source3: W): T_2 & U_2 & V_1 & W;
    (target: object, ...sources: any[]): any;
};
export declare const getDescriptor: (o: any, p: string | number | symbol) => PropertyDescriptor | undefined;
export declare const defineProperty: (o: any, p: string | number | symbol, attributes: PropertyDescriptor & ThisType<any>) => any;
export declare const objectPrototype: Object;
export declare const EMPTY_ARRAY: never[];
export declare const EMPTY_OBJECT: {};
export interface Lambda {
    (): void;
    name?: string;
}
export declare function assertProxies(): void;
export declare function warnAboutProxyRequirement(msg: string): void;
export declare function getNextId(): number;
/**
 * Makes sure that the provided function is invoked at most once.
 */
export declare function once(func: Lambda): Lambda;
export declare const noop: () => void;
export declare function isFunction(fn: any): fn is Function;
export declare function isString(value: any): value is string;
export declare function isStringish(value: any): value is string | number | symbol;
export declare function isObject(value: any): value is Object;
export declare function isPlainObject(value: any): boolean;
export declare function isGenerator(obj: any): boolean;
export declare function addHiddenProp(object: any, propName: PropertyKey, value: any): void;
export declare function addHiddenFinalProp(object: any, propName: PropertyKey, value: any): void;
export declare function assertPropertyConfigurable(object: any, prop: PropertyKey): void;
export declare function createInstanceofPredicate<T>(name: string, theClass: new (...args: any[]) => T): (x: any) => x is T;
export declare function isES6Map(thing: any): boolean;
export declare function isES6Set(thing: any): thing is Set<any>;
/**
 * Returns the following: own keys, prototype keys & own symbol keys, if they are enumerable.
 */
export declare function getPlainObjectKeys(object: any): (string | symbol)[];
export declare const ownKeys: (target: any) => PropertyKey[];
export declare function stringifyKey(key: any): string;
export declare function toPrimitive(value: any): any;
export declare function hasProp(target: Object, prop: PropertyKey): boolean;
export declare const getOwnPropertyDescriptors: <T>(o: T) => { [P in keyof T]: TypedPropertyDescriptor<T[P]>; } & {
    [x: string]: PropertyDescriptor;
};
