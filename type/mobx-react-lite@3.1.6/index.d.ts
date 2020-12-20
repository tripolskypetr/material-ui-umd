import * as staticRendering from "./staticRendering";

import * as observer from "./observer";
import * as ObserverComponent from "./ObserverComponent";
import * as useLocalObservable from "./useLocalObservable";
import * as useLocalStore from "./useLocalStore";
import * as useAsObservableSource from "./useAsObservableSource";

import * as reactionCleanupTracking from './utils/reactionCleanupTracking';
import * as observerBatching from './utils/observerBatching';

declare global {

  export namespace mobxReactLite {

    export const isUsingStaticRendering = staticRendering.isUsingStaticRendering;
    export const enableStaticRendering = staticRendering.enableStaticRendering;

    export const observer = observer.observer;
    export const IObserverOptions = observer.IObserverOptions;

    export const Observer = Observer.ObserverComponent;
    export const useLocalObservable = useLocalObservable.useLocalObservable;
    export const useLocalStore = useLocalStore.useLocalStore;
    export const useAsObservableSource = useAsObservableSource.useAsObservableSource;

    export const clearTimers = reactionCleanupTracking.resetCleanupScheduleForTests;

    export declare function useObserver<T>(fn: () => T, baseComponentName?: string): T;
    export const isObserverBatched = observerBatching.isObserverBatched; 
    export declare function useStaticRendering(enable: boolean): void;
    export const observerBatching = observerBatching.observerBatching;

  } // namespace mobxReactLite

} // declare global
