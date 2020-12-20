import * as staticRendering from "./staticRendering";

import * as observerM from "./observer";
import * as ObserverComponentM from "./ObserverComponent";
import * as useLocalObservableM from "./useLocalObservable";
import * as useLocalStoreM from "./useLocalStore";
import * as useAsObservableSourceM from "./useAsObservableSource";

import * as reactionCleanupTracking from './utils/reactionCleanupTracking';
import * as observerBatching from './utils/observerBatching';

declare global {

  export namespace mobxReactLite {

    export const isUsingStaticRendering = staticRendering.isUsingStaticRendering;
    export const enableStaticRendering = staticRendering.enableStaticRendering;

    export const observer = observerM.observer;
    export const IObserverOptions = observerM.IObserverOptions;

    export const Observer = ObserverComponentM.ObserverComponent;
    export const useLocalObservable = useLocalObservableM.useLocalObservable;
    export const useLocalStore = useLocalStoreM.useLocalStore;
    export const useAsObservableSource = useAsObservableSourceM.useAsObservableSource;

    export const clearTimers = reactionCleanupTracking.resetCleanupScheduleForTests;

    export declare function useObserver<T>(fn: () => T, baseComponentName?: string): T;
    export const isObserverBatched = observerBatching.isObserverBatched; 
    export declare function useStaticRendering(enable: boolean): void;
    export const observerBatching = observerBatching.observerBatching;

  } // namespace mobxReactLite

} // declare global
