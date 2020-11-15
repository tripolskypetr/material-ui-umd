namespace pickers {

  const {
    createContext,
    useCallback,
    useContext,
    useState,
  } = React;

  export namespace components {

    const TimeContext = createContext(null);

    export const TimeProvider = ({
      children = null,
    }) => {
      const [props, setProps] = useState(null);
      const useTime = () => () => new Promise<any>((onChange) => setProps({onChange}));
      const onChange = useCallback((time) => {
        props.onChange(time);
        setProps(null);
      }, [props]);
      return (
        <TimeContext.Provider value={useTime}>
          {props && <TimePickerModal onChange={onChange}/>}
          {children}
        </TimeContext.Provider>
      );
    };

    export const useTime = () => useContext(TimeContext)();

  } // namespace components

} // namespace pickers
