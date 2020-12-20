import { Annotation } from "../internal";
export declare const ACTION = "action";
export declare const ACTION_BOUND = "action.bound";
export declare const AUTOACTION = "autoAction";
export declare const AUTOACTION_BOUND = "autoAction.bound";
export interface IActionFactory extends Annotation, PropertyDecorator {
    <T extends Function>(fn: T): T;
    <T extends Function>(name: string, fn: T): T;
    (customName: string): PropertyDecorator & Annotation;
    bound: IBoundActionFactory;
}
interface IBoundActionFactory extends Annotation, PropertyDecorator {
    (name: string): Annotation & PropertyDecorator;
}
export declare const action: IActionFactory;
export declare const autoAction: IActionFactory;
export declare function runInAction<T>(fn: () => T): T;
export declare function isAction(thing: any): boolean;
export {};
