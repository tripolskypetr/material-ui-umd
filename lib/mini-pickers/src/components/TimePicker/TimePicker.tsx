namespace pickers {

  const {
    Toolbar,
  } = material.core;

  const {
    makeStyles,
  } = material.core;

  const {
    pickerStyles,
  } = utils;

  const {
    useState,
    useCallback,
  } = React;

  export namespace components {

    const useStyles = makeStyles((theme) => {
      const globalStyles = pickerStyles(theme);
      return {
        ...globalStyles,
        toolbar: {
          ...globalStyles.toolbar,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 50,
        },
        separator: {
          margin: '0 2px 0 4px',
          cursor: 'default',
        },
        ampmSelection: {
          marginLeft: 20,
          marginRight: -20,
        },
        ampmLabel: {
          fontSize: 18,
        },
      };
    });

    export const TimePicker = ({
      onChange = (change) => console.log({change}),
      date = moment(),
    }) => {
      const classes = useStyles();
      const [state, setState] = useState({
        meridiemMode: date.format('a'),
        isHourViewShown: true,
      });
      const handleChange = useCallback((time) => {
        if (time.format('a') !== state.meridiemMode) {
          const hours = state.meridiemMode === 'am'
            ? time.hours() - 12
            : time.hours() + 12;
          time = time.clone().hours(hours);
        }
        onChange(time);
      }, [state]);
      const setMeridiemMode = (mode) => () => setState((p) => {
        setTimeout(() => handleChange(date));
        return {...p, meridiemMode: mode };
      });
      const openMinutesView = () => setState((p) => ({...p, isHourViewShown: false}));
      const openHourView = () => setState((p) => ({...p, isHourViewShown: true}));
      return (
        <div className={classes.container}>
          <Toolbar className={classes.toolbar}>
            <ToolbarButton
              type="display3"
              onClick={openHourView}
              selected={state.isHourViewShown}
              label={date.format('hh')}
            />
            <ToolbarButton
              type="display3"
              label=":"
              selected={false}
              className={classes.separator}
            />
            <ToolbarButton
              type="display3"
              onClick={openMinutesView}
              selected={!state.isHourViewShown}
              label={date.format('mm')}
            />
            <div className={classes.ampmSelection}>
              <ToolbarButton
                className={classes.ampmLabel}
                selected={state.meridiemMode === 'am'}
                type="subheading"
                label="AM"
                onClick={setMeridiemMode('am')}
              />
              <ToolbarButton
                className={classes.ampmLabel}
                selected={state.meridiemMode === 'pm'}
                type="subheading"
                label="PM"
                onClick={setMeridiemMode('pm')}
              />
            </div>
          </Toolbar>
          {
            state.isHourViewShown
              ?
                <HourView
                  date={date}
                  onChange={handleChange}
                />
              :
                <MinutesView
                  date={date}
                  onChange={handleChange}
                />
          }
        </div>
      );
    };

  } // namespace components

} // namespace pickers
