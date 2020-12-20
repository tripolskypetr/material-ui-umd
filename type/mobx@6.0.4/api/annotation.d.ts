export declare type Annotation = {
    annotationType_: "observable" | "observable.ref" | "observable.shallow" | "observable.struct" | "computed" | "computed.struct" | "action" | "action.bound" | "autoAction" | "autoAction.bound" | "flow";
    arg_?: any;
};
export declare type AnnotationMapEntry = Annotation | true | false;
export declare type AnnotationsMap<T, AdditionalFields extends PropertyKey> = {
    [P in Exclude<keyof T, "toString">]?: AnnotationMapEntry;
} & Record<AdditionalFields, AnnotationMapEntry>;
