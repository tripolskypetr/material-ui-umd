namespace pickers {

  const {
    useState,
    useCallback,
  } = React;

  export namespace components {

    export const TimePickerModal = ({
      onChange = (change) => console.log({change}),
    }) => {
      const [time, setTime] = useState(moment());
      const handleChange = (time) => setTime(time);
      const handleAccept = useCallback(() => onChange(time), [time]);
      const handleDismiss = () => onChange(null);
      return (
        <ModalDialog
          open={true}
          onAccept={handleAccept}
          onDismiss={handleDismiss}
        >
          <TimePicker
            date={time}
            onChange={handleChange}
          />
        </ModalDialog>
      );
    };

  } // namespace components

} // namespace pickers
