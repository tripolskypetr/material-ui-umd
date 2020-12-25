namespace pickers {

  const {
    createContext,
    useCallback,
    useContext,
    useState,
  } = React;

  const {
    Box,
    Typography,
    DialogTitle,
  } = material.core;

  export namespace components {

    const ConfirmContext = createContext(null);

    const ConfirmModal = ({
      title = '',
      description = '',
      onChange = (value) => console.log({value}),
    }) => {
      const handleAccept = () => onChange(true);
      const handleDismiss = () => onChange(false);
      return (
        <ModalDialog open={true}
          onAccept={handleAccept}
          onDismiss={handleDismiss}
        >
          <DialogTitle>
            <Box mr={3}>
              {title}
            </Box>
          </DialogTitle>
          <Box p={3}>
            <Typography variant="body2">
              {description}
            </Typography>
          </Box>
        </ModalDialog>
      );
    };

    export const ConfirmProvider = ({
      children = null,
    }) => {
      const [props, setProps] = useState(null);
      const useConfirm = () => (title, description = '') => new Promise<any>((onChange) => setProps({
        title, description, onChange,
      }));
      const onChange = useCallback((value) => {
        props.onChange(value);
        setProps(null);
      }, [props]);
      return (
        <ConfirmContext.Provider value={useConfirm}>
          {props && <ConfirmModal 
            title={props.title} 
            description={props.description}
            onChange={onChange} /> }
          {children}
        </ConfirmContext.Provider>
      );
    };

    export const useConfirm = () => useContext(ConfirmContext)();

  } // namespace components

} // namespace pickers
