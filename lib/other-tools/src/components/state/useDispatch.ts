namespace other {

  const {
    useContext,
    createContext,
  } = React;

  export namespace components {

    export type useDispatchHook<T = other.state.IReducerAction> = () => [any, (args: T) => any];

    export const DispatchContext = createContext<useDispatchHook>(null);

    export const useDispatch = () => {
      const ctx = useContext(DispatchContext);
      if (ctx) {
        return ctx();
      } else {
        return [null];
      }
    };

  } // namespace components

} // namespace other
