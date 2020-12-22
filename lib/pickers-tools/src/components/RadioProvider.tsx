namespace pickers {

  const {
    createContext,
    useCallback,
    useContext,
    useState,
  } = React;

  const {
    Box,
    Radio,
    RadioGroup,
    DialogTitle,
    FormControlLabel,
  } = material.core;

  export namespace components {

    const RadioContext = createContext(null);

    const RadioModal = ({
      title = '',
      items = [],
      onChange = (value) => console.log({value}),
    }) => {
      const [value, setValue] = useState(null);
      const handleChange = ({target}) => setValue(target.value);
      const handleAccept = () => onChange(value);
      const handleDismiss = () => onChange(null);
      return (
        <ModalDialog open={true}
          onAccept={handleAccept}
          onDismiss={handleDismiss}
        >
          {title && <DialogTitle>
            <Box mr={3}>
              {title}
            </Box>
          </DialogTitle>}
          <Box pl={3} pr={3} minWidth={225}>
            <RadioGroup value={value} onChange={handleChange}>
              {items.map((item, idx) => (
                <FormControlLabel control={<Radio />}
                  value={item} key={idx} label={item} />
              ))}
            </RadioGroup>
          </Box>
        </ModalDialog>
      );
    };

    export const RadioProvider = ({
      children = null,
    }) => {
      const [props, setProps] = useState(null);
      const useRadio = () => (title, items = ['Empty list']) => new Promise<any>((onChange) => setProps({
        title, items, onChange: (item) => onChange([item, items.indexOf(item)]),
      }));
      const onChange = useCallback((value) => {
        props.onChange(value);
        setProps(null);
      }, [props]);
      return (
        <RadioContext.Provider value={useRadio}>
          {props && <RadioModal 
            title={props.title} 
            items={props.items}
            onChange={onChange} /> }
          {children}
        </RadioContext.Provider>
      );
    };

    export const useRadio = () => useContext(RadioContext)();

  } // namespace components

} // namespace pickers
