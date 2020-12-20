import { AnnotationsMap, Annotation, CreateObservableOptions, ObservableObjectAdministration } from "../internal";
export declare function makeProperty(adm: ObservableObjectAdministration, owner: Object, key: PropertyKey, descriptor: PropertyDescriptor, annotation: Annotation | boolean, forceCopy: boolean, // extend observable will copy even unannotated properties
autoBind: boolean): void;
declare type NoInfer<T> = [T][T extends any ? 0 : never];
export declare function makeObservable<T, AdditionalKeys extends PropertyKey = never>(target: T, annotations?: AnnotationsMap<T, NoInfer<AdditionalKeys>>, options?: CreateObservableOptions): T;
export declare function makeAutoObservable<T extends Object, AdditionalKeys extends PropertyKey = never>(target: T, overrides?: AnnotationsMap<T, NoInfer<AdditionalKeys>>, options?: CreateObservableOptions): T;
export {};
