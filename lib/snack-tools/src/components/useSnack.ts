namespace snack {

  const {
    useContext,
    createContext,
  } = React;

  export namespace components {

    type useSnackHook = (obj: ISnack) => void;

    export const SnackContext = createContext<useSnackHook>(null);

    export const useSnack = () => useContext(SnackContext);

  } // namespace components

} // namespace snack
