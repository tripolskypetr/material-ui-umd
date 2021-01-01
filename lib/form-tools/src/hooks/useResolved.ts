/// <reference path="../utils/index.ts"/>

namespace form {

  const {
    useRef,
    useState,
    useEffect,
  } = React;

  const {
    deepMerge: assign,
    initialValue,
    deepCompare,
    deepClone,
    deepFlat,
    create,
    set,
    get,
  } = utils;

  export namespace hooks {

    interface IResolvedHookProps {
      handler: () => Promise<any> | any,
      fallback: (e: Error) => void,
      fields: IField[],
      change: (obj: any, initial?: boolean) => void,
    }

    type useResolvedHook = (
      props: IResolvedHookProps
    ) => [any, (v: any) => void];

    const buildObj = (fields: IField[]) => {
      const obj = {};
      if (fields) {
        deepFlat(fields, "fields").forEach((f) => {
          if (f.name && f.type) {
            create(obj, f.name);
            const value = f.defaultValue || get(obj, f.name) || initialValue(f.type);
            set(obj, f.name, value);
          }
        });
      }
      return obj;
    };

    /**
     * Хук разрешает обработчик на корневом уровне, при чем только
     * один раз. Для дочерних One компонентов осуществляется
     * подписка на изменения
     */
    export const useResolved: useResolvedHook = ({
      handler,
      fallback,
      fields,
      change,
    }) => {
      const [data, setData] = useState(null);
      const isRoot = useRef(false);
      useEffect(() => {
        const tryResolve = async () => {
          if (isRoot.current) {
            return
          } else if (typeof handler === 'function') {
            try {
              const result = handler();
              if (result instanceof Promise) {
                const newData = assign(buildObj(fields), deepClone(await result));
                change(newData, true);
                setData(newData);
              } else {
                const newData = assign(buildObj(fields), deepClone(result));
                change(newData, true);
                setData(newData);
              }
            } catch (e) {
              if (fallback) {
                fallback(e);
              } else {
                throw e;
              }
            } finally {
              isRoot.current = true;
            }
          } else if (!deepCompare(data, handler)) {
            setData(assign(buildObj(fields), handler));
          }
        };
        tryResolve();
      }, [handler]);
      return [data, setData];
    };

  } // namespace hooks

} // namespace form
