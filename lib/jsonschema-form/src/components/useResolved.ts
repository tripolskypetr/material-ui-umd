
/// <reference path="../utils/index.ts"/>

namespace form {

  const {
    useRef,
    useState,
    useEffect,
  } = React;

  const {
    deepClone,
  } = utils;

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
          } if (typeof handler === 'function') {
            const result = handler();
            if (result instanceof Promise) {
            setData(deepClone(await result));
            } else {
              setData(deepClone(result));
            }
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
