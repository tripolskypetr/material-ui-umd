namespace pickers {

  const {
    createContext,
    useContext,
    useState,
  } = React;

  const {
    Fragment,
  } = React;

  export namespace components {

    type useDateHook = (p: IDatePickerProps) => void;

    const DateContext = createContext<useDateHook>(null);

    const applyCloseMiddleware = (
      props: IDatePickerProps,
      onClose: CallableFunction,
    ): IDatePickerProps => ({
      ...props,
      onAccept(...args) {
        if (props.onAccept) {
          setTimeout(() => props.onAccept(...args))
        }
        onClose();
      },
      onDismiss(...args) {
        if (props.onDismiss) {
          setTimeout(() => props.onDismiss(...args));
        }
        onClose();
      },
    });

    export const DateProvider = ({
      children = null,
    }) => {
      const [props, setProps] = useState<IDatePickerProps>(null);
      const onClose = () => setProps(null);
      const useDate = (props) => setProps(props);
      return (
        <DateContext.Provider value={useDate}>
          {props && <DatePickerDialog {...applyCloseMiddleware(props, onClose)}/>}
          {children}
        </DateContext.Provider>
      );
    };

    export const useDate: useDateHook = () => useContext(DateContext);

  } // namespace components

} // namespace pickers
