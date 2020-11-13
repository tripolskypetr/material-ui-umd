namespace form {

  const {
    useState,
    useLayoutEffect,
  } = React;

  const {
    deepCompare,
  } = utils;

  export namespace components {

    /**
     * Конструкция позволяет дождаться применения всех эффектов, а затем дополнительно
     * запустить таймер, для операций дорогих по производительности!
     */
    export const useDelayed = (
      calculate: () => any,
      delay: (v: any) => void,
      deps: any[],
    ) => {
      const [value, setValue] = useState(null);
      useLayoutEffect(() => {
        const compute = calculate();
        if (deepCompare(value, compute)) {
          return;
        } else {
          const timeout = setTimeout((v) => setValue(delay(v)), 1_000, compute);
          return () => clearTimeout(timeout);
        }
      }, deps);
      return value;
    };

  } // namespace components

} // namespace form
