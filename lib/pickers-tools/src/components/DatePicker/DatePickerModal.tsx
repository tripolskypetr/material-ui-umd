namespace pickers {

  const {
    useState,
  } = React;

  export namespace components {

    export const DatePickerModal = ({
      onChange = (change) => console.log({change}),
      animateYearScrolling = false,
      openToYearSelection = false,
      disableFuture = false,
      now = moment(),
    }) => {
      const [date, setDate] = useState(moment(now));
      const handleChange = (date) => setDate(date);
      const handleAccept = () => onChange(date);
      const handleDismiss = () => onChange(null);
      return (
        <ModalDialog
          open={true}
          onAccept={handleAccept}
          onDismiss={handleDismiss}
        >
          <DatePicker
            date={date}
            onChange={handleChange}
            disableFuture={disableFuture}
            animateYearScrolling={animateYearScrolling}
            openToYearSelection={openToYearSelection}
          />
        </ModalDialog>
      );
    };

  } // namespace components

} // namespace pickers
