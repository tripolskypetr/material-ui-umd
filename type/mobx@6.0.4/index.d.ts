import * as internal from "./internal";

declare global {

  export namespace mobx {

    export const IObservable = internal.IObservable;
    export const IDepTreeNode = internal.IDepTreeNode;
    export const Reaction = internal.Reaction;
    export const IReactionPublic = internal.IReactionPublic;
    export const IReactionDisposer = internal.IReactionDisposer;
    export const untracked = internal.untracked;
    export const IAtom = internal.IAtom;
    export const createAtom = internal.createAtom;
    export const spy = internal.spy;
    export const IComputedValue = internal.IComputedValue;
    export const IEqualsComparer = internal.IEqualsComparer;
    export const comparer = internal.comparer;
    export const IEnhancer = internal.IEnhancer;
    export const IInterceptable = internal.IInterceptable;
    export const IInterceptor = internal.IInterceptor;
    export const IListenable = internal.IListenable;
    export const IObjectWillChange = internal.IObjectWillChange;
    export const IObjectDidChange = internal.IObjectDidChange;
    export const isObservableObject = internal.isObservableObject;
    export const IValueDidChange = internal.IValueDidChange;
    export const IValueWillChange = internal.IValueWillChange;
    export const IObservableValue = internal.IObservableValue;
    export const isBoxedObservable = internal.isObservableValue;
    export const IObservableArray = internal.IObservableArray;
    export const IArrayWillChange = internal.IArrayWillChange;
    export const IArrayWillSplice = internal.IArrayWillSplice;
    export const IArraySplice = internal.IArraySplice;
    export const IArrayUpdate = internal.IArrayUpdate;
    export const IArrayDidChange = internal.IArrayDidChange;
    export const isObservableArray = internal.isObservableArray;
    export const IKeyValueMap = internal.IKeyValueMap;
    export const ObservableMap = internal.ObservableMap;
    export const IMapEntries = internal.IMapEntries;
    export const IMapEntry = internal.IMapEntry;
    export const IMapWillChange = internal.IMapWillChange;
    export const IMapDidChange = internal.IMapDidChange;
    export const isObservableMap = internal.isObservableMap;
    export const IObservableMapInitialValues =
      internal.IObservableMapInitialValues;
    export const ObservableSet = internal.ObservableSet;
    export const isObservableSet = internal.isObservableSet;
    export const ISetDidChange = internal.ISetDidChange;
    export const ISetWillChange = internal.ISetWillChange;
    export const IObservableSetInitialValues =
      internal.IObservableSetInitialValues;
    export const transaction = internal.transaction;
    export const observable = internal.observable;
    export const IObservableFactory = internal.IObservableFactory;
    export const computed = internal.computed;
    export const isObservable = internal.isObservable;
    export const isObservableProp = internal.isObservableProp;
    export const isComputed = internal.isComputed;
    export const isComputedProp = internal.isComputedProp;
    export const extendObservable = internal.extendObservable;
    export const observe = internal.observe;
    export const intercept = internal.intercept;
    export const autorun = internal.autorun;
    export const IAutorunOptions = internal.IAutorunOptions;
    export const reaction = internal.reaction;
    export const IReactionOptions = internal.IReactionOptions;
    export const when = internal.when;
    export const IWhenOptions = internal.IWhenOptions;
    export const action = internal.action;
    export const isAction = internal.isAction;
    export const runInAction = internal.runInAction;
    export const IActionFactory = internal.IActionFactory;
    export const keys = internal.keys;
    export const values = internal.values;
    export const entries = internal.entries;
    export const set = internal.set;
    export const remove = internal.remove;
    export const has = internal.has;
    export const get = internal.get;
    export const configure = internal.configure;
    export const onBecomeObserved = internal.onBecomeObserved;
    export const onBecomeUnobserved = internal.onBecomeUnobserved;
    export const flow = internal.flow;
    export const flowResult = internal.flowResult;
    export const FlowCancellationError = internal.FlowCancellationError;
    export const isFlowCancellationError = internal.isFlowCancellationError;
    export const toJS = internal.toJS;
    export const trace = internal.trace;
    export const IObserverTree = internal.IObserverTree;
    export const IDependencyTree = internal.IDependencyTree;
    export const getDependencyTree = internal.getDependencyTree;
    export const getObserverTree = internal.getObserverTree;
    export const _getGlobalState = internal.getGlobalState;
    export const getDebugName = internal.getDebugName;
    export const getAtom = internal.getAtom;
    export const _getAdministration = internal.getAdministration;
    export const _allowStateChanges = internal.allowStateChanges;
    export const _allowStateChangesInsideComputed = internal.runInAction;
    export const Lambda = internal.Lambda;
    export const $mobx = internal.$mobx;
    export const _isComputingDerivation = internal.isComputingDerivation;
    export const onReactionError = internal.onReactionError;
    export const _interceptReads = internal.interceptReads;
    export const IComputedValueOptions = internal.IComputedValueOptions;
    export const IActionRunInfo = internal.IActionRunInfo;
    export const _startAction = internal._startAction;
    export const _endAction = internal._endAction;
    export const _allowStateReadsStart = internal.allowStateReadsStart;
    export const _allowStateReadsEnd = internal.allowStateReadsEnd;
    export const makeObservable = internal.makeObservable;
    export const makeAutoObservable = internal.makeAutoObservable;
    export const _autoAction = internal.autoAction;
    export const AnnotationsMap = internal.AnnotationsMap;
    export const AnnotationMapEntry = internal.AnnotationMapEntry;

  } // namespace mobx

} // declare mobx
