namespace form {

  const {
    useState,
    useEffect
  } = React;

  export namespace components {

    export const useResolved = (handler: () => Promise<any> | any): any => {
      const [data, setData] = useState(null);
      useEffect(() => {
        const tryResolve = async () => {
          if (handler instanceof Promise) {
            setData(await handler());
          } else if (typeof handler === 'function') {
            setData(handler());
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
