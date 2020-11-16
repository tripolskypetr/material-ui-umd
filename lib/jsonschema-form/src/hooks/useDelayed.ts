namespace form {

  const {
    useState,
    useLayoutEffect,
  } = React;

  export namespace hooks {

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
        const computed = calculate();
        const timeout = setTimeout((v) => setValue(delay(v)), 1_000, computed);
        return () => clearTimeout(timeout);
      }, deps);
      return value;
    };

  } // namespace hooks

} // namespace form
