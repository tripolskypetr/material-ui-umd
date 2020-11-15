namespace pickers {

  const {
    createContext,
    useCallback,
    useContext,
    useState,
  } = React;

  export namespace components {

    type useTimeHook = (p: IPickerProps) => void;

    const TimeContext = createContext<useTimeHook>(null);

    export const TimeProvider = ({
      children = null,
    }) => {
      const [props, setProps] = useState<IPickerProps>(null);
      const useTime = (props) => setProps(props);
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

    export const useTime: useTimeHook = () => useContext(TimeContext);

  } // namespace components

} // namespace pickers
