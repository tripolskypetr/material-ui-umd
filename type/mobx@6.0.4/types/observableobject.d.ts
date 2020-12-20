import { ComputedValue, IAtom, IComputedValueOptions, IEnhancer, IInterceptable, IListenable, Lambda, ObservableValue } from "../internal";
export declare type IObjectDidChange<T = any> = {
    observableKind: "object";
    name: PropertyKey;
    object: T;
    debugObjectName: string;
} & ({
    type: "add";
    newValue: any;
} | {
    type: "update";
    oldValue: any;
    newValue: any;
} | {
    type: "remove";
    oldValue: any;
});
export declare type IObjectWillChange<T = any> = {
    object: T;
    type: "update" | "add";
    name: PropertyKey;
    newValue: any;
} | {
    object: T;
    type: "remove";
    name: PropertyKey;
};
export declare class ObservableObjectAdministration implements IInterceptable<IObjectWillChange>, IListenable {
    target_: any;
    values_: Map<string | number | symbol, ObservableValue<any> | ComputedValue<any>>;
    name_: string;
    defaultEnhancer_: IEnhancer<any>;
    keysAtom_: IAtom;
    changeListeners_: any;
    interceptors_: any;
    proxy_: any;
    private pendingKeys_;
    private keysValue_;
    private isStaledKeysValue_;
    constructor(target_: any, values_: Map<string | number | symbol, ObservableValue<any> | ComputedValue<any>>, name_: string, defaultEnhancer_: IEnhancer<any>);
    read_(key: PropertyKey): any;
    write_(key: PropertyKey, newValue: any): void;
    has_(key: PropertyKey): any;
    addObservableProp_(propName: PropertyKey, newValue: any, enhancer?: IEnhancer<any>): void;
    addComputedProp_(propertyOwner: any, // where is the property declared?
    propName: PropertyKey, options: IComputedValueOptions<any>): void;
    remove_(key: PropertyKey): void;
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    observe_(callback: (changes: IObjectDidChange) => void, fireImmediately?: boolean): Lambda;
    intercept_(handler: any): Lambda;
    notifyPropertyAddition_(key: PropertyKey, newValue: any): void;
    getKeys_(): PropertyKey[];
    private reportKeysChanged;
}
export interface IIsObservableObject {
    $mobx: ObservableObjectAdministration;
}
export declare function asObservableObject(target: any, name?: PropertyKey, defaultEnhancer?: IEnhancer<any>): ObservableObjectAdministration;
export declare function generateObservablePropConfig(propName: any): any;
export declare function generateComputedPropConfig(propName: any): any;
export declare function isObservableObject(thing: any): boolean;
