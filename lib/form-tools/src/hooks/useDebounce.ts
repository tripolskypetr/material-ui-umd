namespace form {

  const {
    useCallback,
    useEffect,
    useState,
    useRef,
  } = React;

  export namespace hooks {

    function valueEquality<T>(left: T, right: T): boolean {
      return left === right;
    }
    
    export function useDebounce<T>(
      value: T,
      delay: number,
      options?: { maxWait?: number; leading?: boolean; trailing?: boolean; equalityFn?: (left: T, right: T) => boolean }
    ): [T, DebouncedControlFunctions] {
      const eq = (options && options.equalityFn) || valueEquality;
    
      const [state, dispatch] = useState(value);
      const debounced = useDebouncedCallback(useCallback((value: T) => dispatch(value), []), delay, options);
      const previousValue = useRef(value);
    
      useEffect(() => {
        // We need to use this condition otherwise we will run debounce timer for the first render (including maxWait option)
        if (!eq(previousValue.current, value)) {
          debounced.callback(value);
          previousValue.current = value;
        }
      }, [value, debounced, eq]);
    
      return [state, { cancel: debounced.cancel, pending: debounced.pending, flush: debounced.flush }];
    }

  } // namespace hooks

} // namespace form
