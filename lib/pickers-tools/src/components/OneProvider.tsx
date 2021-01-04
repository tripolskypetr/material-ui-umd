namespace pickers {

  const {
    createContext,
    useCallback,
    useContext,
    useState,
  } = React;

  const {
    Box,
    DialogTitle,
  } = material.core;

  const {
    One,
  } = form;

  export namespace components {

    const OneContext = createContext(null);

    const OneModal = ({
      title = '',
      fields = [],
      onChange = (value) => console.log({value}),
    }) => {
      const [data, setData] = useState(null);
      const handleAccept = () => onChange(data);
      const handleDismiss = () => onChange(null);
      return (
        <ModalDialog 
          open={true}
          onAccept={handleAccept}
          onDismiss={handleDismiss}
        >
          <DialogTitle>
            <Box mr={3}>
              {title}
            </Box>
          </DialogTitle>
          <Box p={3}>
            <One
              change={(obj) => setData(obj)}
              fields={fields}
            />
          </Box>
        </ModalDialog>
      );
    };

    export const OneProvider = ({
      children = null,
    }) => {
      const [props, setProps] = useState(null);
      const useOne = () => (title, fields = []) => new Promise<any>((onChange) => setProps({
        title, fields, onChange,
      }));
      const onChange = useCallback((value) => {
        props.onChange(value);
        setProps(null);
      }, [props]);
      return (
        <OneContext.Provider value={useOne}>
          {props && <OneModal 
            title={props.title} 
            fields={props.fields}
            onChange={onChange} /> }
          {children}
        </OneContext.Provider>
      );
    };

    export const useOne = () => useContext(OneContext)();

  } // namespace components

} // namespace pickers
