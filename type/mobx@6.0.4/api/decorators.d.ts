import { Annotation } from "../internal";
export declare const mobxDecoratorsSymbol: unique symbol;
export declare function createDecorator<ArgType>(type: Annotation["annotationType_"]): Annotation & PropertyDecorator & ((arg: ArgType) => PropertyDecorator & Annotation);
export declare function createDecoratorAndAnnotation(type: Annotation["annotationType_"], arg_?: any): PropertyDecorator & Annotation;
export declare function storeDecorator(target: any, property: PropertyKey, type: Annotation["annotationType_"], arg_?: any): void;
export declare function applyDecorators(target: Object): boolean;
