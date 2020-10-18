
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
    flat,
  } = utils;

  const {
    assign,
  } = Object;

  export namespace components {

    const buildObj = (fields: IField[]) => {
      const obj = {};
      if (fields) {
        flat(fields, "fields").forEach((f) => {
          if (f.name && f.type) {
            obj[f.name] = initialValue(f.type);
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
    export const useResolved = (handler: () => Promise<any> | any, fields: IField[]): any => {
      const [data, setData] = useState(null);
      const isRoot = useRef(false);
      useEffect(() => {
        const tryResolve = async () => {
          if (isRoot.current) {
            return
          } if (typeof handler === 'function') {
            const result = handler();
            if (result instanceof Promise) {
              setData(assign(buildObj(fields), deepClone(await result)));
            } else {
              setData(assign(buildObj(fields), deepClone(result)));
            }
            isRoot.current = true;
          } else {
            setData(assign(buildObj(fields), handler));
          }
        };
        tryResolve();
      }, [handler]);
      return [data, setData];
    };

  } // namespace components

} // namespace form
