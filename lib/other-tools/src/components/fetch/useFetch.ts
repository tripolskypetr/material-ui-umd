namespace other {

  const {
    useContext,
    createContext,
  } = React;

  export namespace components {

    export type fetchFunc<J = any> = (url: string, options?: other.fetch.IFetchOptions) => Promise<other.fetch.IResponse<J>>;
    export type useFetchHook<J = any> = () => fetchFunc<J>;

    export const FetchContext = createContext<useFetchHook>(null);

    export const useFetch = <J = any>() => useContext<useFetchHook<J>>(FetchContext)();

  } // namespace components

} // namespace other