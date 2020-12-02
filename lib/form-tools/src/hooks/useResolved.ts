
/// <reference path="../utils/index.ts"/>

namespace form {

  const {
    useRef,
    useState,
    useEffect,
  } = React;

  const {
    initialValue,
    deepClone,
    deepFlat,
    create,
  } = utils;

  const {
    assign,
  } = Object;

  export namespace hooks {

    type useResolvedHook = (
      handler: () => Promise<any> | any,
      fallback: (e: Error) => void,
      fields: IField[],
    ) => [any, (v: any) => void];

    const buildObj = (fields: IField[]) => {
      const obj = {};
      if (fields) {
        deepFlat(fields, "fields").forEach((f) => {
          if (f.name && f.type) {
            create(obj, f.name);
            obj[f.name] = f.defaultValue || initialValue(f.type);
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
    export const useResolved: useResolvedHook = (handler, fallback, fields) => {
      const [data, setData] = useState(null);
      const isRoot = useRef(false);
      useEffect(() => {
        const tryResolve = async () => {
          if (isRoot.current) {
            return
          } if (typeof handler === 'function') {
            try {
              const result = handler();
              if (result instanceof Promise) {
                setData(assign(buildObj(fields), deepClone(await result)));
              } else {
                setData(assign(buildObj(fields), deepClone(result)));
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
          } else {
            setData(assign(buildObj(fields), handler));
          }
        };
        tryResolve();
      }, [handler]);
      return [data, setData];
    };

  } // namespace hooks

} // namespace form
