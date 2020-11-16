namespace other {

  const {
    useState,
    useLayoutEffect,
  } = React;

  export namespace components {

    export interface IFetchProviderProps {
      children?: React.ReactNode;
      /**
       *  - Токен можно передать в заголовке. Если используются
       * state-tools, входным параметром будет текущее состояние
       *  - С существующими заголовками произойдет автоматическая
       * склейка
       * @example {"MY-Token": "J3QQ4-H7H2V-2HCH4-M3HK8-6M8VW"}
       */
      headers?: any | ((s: any) => any) | ((s: any) => Promise<any>);
      /**
       *  - Токен можно передать GET параметром. Если используются
       * state-tools, входным параметром будет текущее состояние.
       *  - С существующими get параметрами произойдет автоматическая
       * склейка
       * @example ?token=J3QQ4-H7H2V-2HCH4-M3HK8-6M8VW
       */
      searchParams?: string | ((s: any) => string) | ((s: any) => Promise<string>);
    }

    const resolve = async (handler: any, state: any) => {
      if (typeof handler === 'function') {
        const result = handler(state);
        if (result instanceof Promise) {
          return await result;
        } else {
          return result;
        }
      } else {
        return handler;
      }
    };

    const combine = (url: string, searchParams) => {
      const {protocol} = location;
      const prefix = url.includes('://') ? '' : protocol + '//';
      const newUrl = new URL(prefix + url);
      const params = new URLSearchParams(searchParams);
      params.forEach((v, k) => newUrl.searchParams.set(k, v));
      return newUrl.toString();
    };

    export const FetchProvider = ({
      searchParams = '',
      children = null,
      headers = {},
    }: IFetchProviderProps) => {

      const [state] = useDispatch();
      const [resolvedHeaders, setResolvedHeaders] = useState(null);
      const [resolvedSearchParams, setResolvedSearchParams] = useState(null);

      useLayoutEffect(() => {
        const process = async () => {
          setResolvedHeaders(await resolve(headers, state));
          setResolvedSearchParams(await resolve(searchParams, state));
        };
        setResolvedHeaders(null);
        setResolvedSearchParams(null);
        process();
      }, [state])

      const f: fetchFunc = (url: string, {
        headers,
        ...otherProps
      } = {headers: {}}) => {

        const options: other.fetch.IFetchOptions = {
          ...otherProps,
          headers: {
            ...headers,
            ...resolvedHeaders,
          },
        };

        return window.fetch(combine(url, resolvedSearchParams), options as any) as any;
      };

      if (resolvedHeaders !== null && resolvedSearchParams !== null) {
        return (
          <FetchContext.Provider value={() => f}>
            {children}
          </FetchContext.Provider>
        );
      } else {
        return null;
      }

    };

  } // namespace components

} // namespace other
