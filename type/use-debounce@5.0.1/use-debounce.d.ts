declare namespace useDebounceHook {

  interface Options {
    maxWait?: number;
    leading?: boolean;
    trailing?: boolean;
  }

  interface ControlFunctions {
      cancel: () => void;
      flush: () => void;
      pending: () => boolean;
  }

  interface DebouncedState<T extends (...args: any[]) => ReturnType<T>> extends ControlFunctions {
      callback: (...args: Parameters<T>) => ReturnType<T>;
  }

  export function useDebouncedCallback<T extends (...args: any[]) => ReturnType<T>>(func: T, wait: number, options?: Options): DebouncedState<T>;

  export function useDebounce<T>(value: T, delay: number, options?: {
    maxWait?: number;
    leading?: boolean;
    trailing?: boolean;
    equalityFn?: (left: T, right: T) => boolean;
  }): [T, ControlFunctions];

}
