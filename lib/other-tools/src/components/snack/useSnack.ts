namespace other {

  const {
    useContext,
    createContext,
  } = React;

  export namespace components {

    type useSnackHook = (message: string, obj?: snack.ISnack) => void;

    export const SnackContext = createContext<useSnackHook>(null);

    export const useSnack = () => useContext(SnackContext);

  } // namespace components

} // namespace snack
