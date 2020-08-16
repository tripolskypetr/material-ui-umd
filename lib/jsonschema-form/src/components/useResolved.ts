namespace form {

  const {
    useRef,
    useState,
    useEffect,
  } = React;

  export namespace components {

    /**
     * Хук разрешает обработчик на корневом уровне, при чем только
     * один раз. Для дочерних One компонентов осуществляется
     * подписка на изменения
     */
    export const useResolved = (handler: () => Promise<any> | any): any => {
      const [data, setData] = useState(null);
      const isRoot = useRef(false);
      useEffect(() => {
        const tryResolve = async () => {
          if (isRoot.current) {
            return
          } else if (handler instanceof Promise) {
            setData(await handler());
            isRoot.current = true;
          } else if (typeof handler === 'function') {
            setData(handler());
            isRoot.current = true;
          } else {
            setData(handler);
          }
        };
        tryResolve();
      }, [handler]);
      return [data, setData];
    };

  } // namespace components

} // namespace form
