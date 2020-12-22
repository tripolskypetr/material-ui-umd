namespace pickers {

  const {
    createContext,
    useCallback,
    useContext,
    useState,
  } = React;

  const {
    Box,
    TextField,
    DialogTitle,
    DialogContentText,
  } = material.core;

  export namespace components {

    const PromptContext = createContext(null);

    const PromptModal = ({
      message = '',
      defaultValue = '',
      onChange = (value) => console.log({value}),
    }) => {
      const [value, setValue] = useState(defaultValue);
      const handleChange = (value) => setValue(value);
      const handleAccept = () => onChange(value);
      const handleDismiss = () => onChange(null);
      return (
        <ModalDialog open={true}
          onAccept={handleAccept}
          onDismiss={handleDismiss}
        >
          {message && <DialogTitle>
            <Box mr={3}>
              {message}
            </Box>
          </DialogTitle>}
          <Box pl={3} pr={3}>
            <TextField 
              onChange={({target}) => handleChange(target.value)}
              autoFocus margin="dense" fullWidth value={value}
              multiline={true} rows={3}
            />
          </Box>
        </ModalDialog>
      );
    };

    export const PromptProvider = ({
      children = null,
    }) => {
      const [props, setProps] = useState(null);
      const usePrompt = () => (message, defaultValue = '') => new Promise<any>((onChange) => setProps({
        message, defaultValue, onChange,
      }));
      const onChange = useCallback((value) => {
        props.onChange(value);
        setProps(null);
      }, [props]);
      return (
        <PromptContext.Provider value={usePrompt}>
          {props && <PromptModal 
            defaultValue={props.defaultValue} 
            message={props.message}
            onChange={onChange} /> }
          {children}
        </PromptContext.Provider>
      );
    };

    export const usePrompt = () => useContext(PromptContext)();

  } // namespace components

} // namespace pickers
