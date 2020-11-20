namespace pickers {

  const {
    createContext,
    useCallback,
    useContext,
    useState,
  } = React;

  export namespace components {

    const DateContext = createContext(null);

    export const DateProvider = ({
      children = null,
    }) => {
      const [props, setProps] = useState(null);
      const useDate = () => (now = moment()) => new Promise<any>((onChange) => setProps({now, onChange}));
      const onChange = useCallback((time) => {
        props.onChange(time);
        setProps(null);
      }, [props]);
      return (
        <DateContext.Provider value={useDate}>
          {props && <DatePickerModal now={props.now} onChange={onChange}/>}
          {children}
        </DateContext.Provider>
      );
    };

    export const useDate = () => useContext(DateContext)();

  } // namespace components

} // namespace pickers
