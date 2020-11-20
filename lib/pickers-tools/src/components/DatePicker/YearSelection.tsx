namespace pickers {

  const {
    makeStyles,
  } = material.core;

  const {
    useRef,
    useCallback,
    useLayoutEffect,
  } = React;

  export namespace components {

    const useStyles = makeStyles((theme) => ({
      container: {
        maxHeight: 320,
        overflowY: 'auto',
        justifyContent: 'center',
      },
      yearItem: {
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        outline: 'none',
        color: theme.palette.text.primary
      },
      selectedYear: {
        fontSize: 26,
        margin: '10px 0',
        color: theme.palette.primary[500],
      },
      disabled: {
        pointerEvents: 'none',
        color: theme.palette.text.hint,
      },
    }));

    const getYears = (minDate: moment.Moment, maxDate: moment.Moment) => {
      const total = maxDate.diff(minDate, 'years') + 1;
      const years: moment.Moment[] = [];
      for (let i = 0; i !== total; i++) {
        years.push(minDate.clone().add(i, 'years'));
      }
      return years;
    };

    export const YearSelection = ({
      date = moment(),
      minDate = moment(),
      maxDate = moment(),
      onChange = (change) => console.log({change}),
      disableFuture = false,
      animateYearScrolling = true,
    }) => {
      const classes = useStyles();
      const rootRef = useRef(null);
      const currentYear = date.get('year');

      useLayoutEffect(() => {
        const {current: root} = rootRef;
        const currentYearElement = root.getElementsByClassName(classes.selectedYear)[0];
        if (currentYearElement) {
          currentYearElement.scrollIntoView({
            behavior: animateYearScrolling ? 'smooth' : 'auto',
          });
        }
      }, [animateYearScrolling]);

      const onYearSelect = useCallback((year) => {
        const newDate = date.clone().set('year', year);
        onChange(newDate);
      }, [date, onChange]);

      return (
        <div ref={rootRef} className={classes.container}>
          {
            getYears(minDate, maxDate)
              .map((year: moment.Moment) => {
                const yearNumber = year.get('year');
                const className = classNames(classes.yearItem, {
                  [classes.selectedYear]: yearNumber === currentYear,
                  [classes.disabled]: disableFuture && year.isAfter(moment()),
                });
                return (
                  <div
                    role="button"
                    key={year.format('YYYY')}
                    className={className}
                    tabIndex={yearNumber}
                    onClick={() => onYearSelect(yearNumber)}
                    onKeyPress={() => onYearSelect(yearNumber)}
                  >
                    { yearNumber }
                  </div>
                );
              })
          }
        </div>
      );
    };

  } // namespace components

} // namespace pickers
