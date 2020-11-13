namespace other {

  const {
    useReducer,
  } = React;

  export namespace components {

    export interface IDispatchProviderProps<S = any> {
      reducer: React.Reducer<S, other.state.IReducerAction>,
      children: React.ReactNode;
      initialState: S;
    }

    export const DispatchProvider = ({
      reducer = () => null,
      initialState = {},
      children = null,
    }: IDispatchProviderProps) => {
      const [state, dispatch] = useReducer<React.Reducer<any, other.state.IReducerAction>>(reducer, initialState);
      const useDispatch: useDispatchHook<other.state.IReducerAction> = () => [state, (args) => dispatch(args)];
      return (
        <DispatchContext.Provider value={useDispatch}>
          {children}
        </DispatchContext.Provider>
      );
    };

  } // namespace components

} // namespace other
