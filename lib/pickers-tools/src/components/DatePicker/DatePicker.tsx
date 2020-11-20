namespace pickers {

  const {
    useState,
  } = React;

  const {
    makeStyles,
  } = material.core;

  const {
    pickerStyles,
  } = utils;

  const {
    Toolbar,
  } = material.core;

  export namespace components {

    const useStyles = makeStyles((theme) => ({
      ...pickerStyles(theme),
    }))

    export const DatePicker = ({
      date = moment(),
      minDate = '1900-01-01',
      maxDate = '2100-01-01',
      onChange = (change) => console.log({change}),
      disableFuture = false,
      animateYearScrolling = true,
      openToYearSelection = false,
    }) => {
      const [showYearSelection, setShowYearSelection] = useState(openToYearSelection);
      const classes = useStyles();
      const openYearSelection = () => setShowYearSelection(true);
      const openCalendar = () => setShowYearSelection(false);
      const startOfDay = date.startOf('day');
      return (
        <div className={classes.container}>
          <Toolbar className={classes.toolbar}>
            <ToolbarButton
              type="subheading"
              onClick={openYearSelection}
              selected={showYearSelection}
              label={date.format('YYYY')}
            />
            <ToolbarButton
              type="display1"
              onClick={openCalendar}
              selected={!showYearSelection}
              label={date.format('ddd, MMM DD')}
            />
          </Toolbar>
          {
            showYearSelection
              ?
                <YearSelection
                  date={startOfDay}
                  onChange={onChange}
                  minDate={moment(minDate)}
                  maxDate={moment(maxDate)}
                  disableFuture={disableFuture}
                  animateYearScrolling={animateYearScrolling}
                />
              :
                <Calendar
                  date={startOfDay}
                  onChange={onChange}
                  disableFuture={disableFuture}
                />
          }
        </div>
      );

    }

  } // namespace components

} // namespace pickers
