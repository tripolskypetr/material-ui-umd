namespace pickers {

  const {
    makeStyles,
  } = material.core;

  const {
    useState,
    useCallback,
  } = React;

  const {
    IconButton,
  } = material.core;

  export namespace components {

    const useStyles = makeStyles((theme) => ({
      calendar: {
        marginTop: 10,
      },
      hidden: {
        opacity: 0,
        pointerEvents: 'none',
      },
      day: {
        width: 36,
        height: 36,
        fontSize: 14,
        margin: '0 2px',
        color: theme.palette.text.primary,
      },
      selected: {
        color: theme.palette.primary[700],
        backgroundColor: theme.palette.primary[200],
      },
      disabled: {
        pointerEvents: 'none',
        color: theme.palette.text.hint,
      },
      week: {
        display: 'flex',
        justifyContent: 'center',
      },
    }));

    const getDays = (minDate: moment.Moment, maxDate: moment.Moment) => {
      const total = maxDate.diff(minDate, 'days');
      const days: moment.Moment[] = [];
      for (let i = 0; i !== total; i++) {
        days.push(minDate.clone().subtract(i, 'days'));
      }
      return days;
    };

    const getWeeks = (minDate: moment.Moment, maxDate: moment.Moment) => {
      const total = maxDate.diff(minDate, 'weeks');
      const weeks: moment.Moment[] = [];
      for (let i = 0; i !== total; i++) {
        weeks.push(minDate.clone().subtract(i, 'weeks'));
      }
      return weeks;
    };

    export const Calendar = ({
      onChange = (change) => console.log({change}),
      disableFuture = false,
      date = moment(),
    }) => {
      const classes = useStyles();
      const [currentMonth, setCurrentMonth] = useState(
        date.clone().startOf('month')
      );
      const renderDays = useCallback((week) => {
        const end = week.clone().endOf('week');
        const currentMonthNumber = currentMonth.get('month');
        return getDays(week, end)
          .map((day: moment.Moment) => {
            const dayClass = classNames(classes.day, {
              [classes.hidden]: day.get('month') !== currentMonthNumber,
              [classes.selected]: day.toString() === date.toString(),
              [classes.disabled]: disableFuture && day.isAfter(moment()),
            });
            return (
              <IconButton
                key={day.toString()}
                className={dayClass}
                onClick={() => onDateSelect(day)}
              >
                <span> { day.format('DD')} </span>
              </IconButton>
            );
          });
      }, [disableFuture, classes, date, currentMonth]);
      const renderWeeks = useCallback(() => {
        const start = currentMonth.clone().startOf('week');
        const end = currentMonth.clone().endOf('month').endOf('week');
        return getWeeks(start, end)
          .map(week => (
            <div key={`week-${week.toString()}`} className={classes.week}>
              { renderDays(week) }
            </div>
          ));
      }, [currentMonth]);
      const onDateSelect = (day) => onChange(day);
      const handleChangeMonth = (newMonth) => setCurrentMonth(newMonth);
      return (
        <div className={classes.container}>
          <CalendarHeader
            currentMonth={currentMonth}
            onMonthChange={handleChangeMonth}
          />
          <div className={classes.calendar}>
            { renderWeeks() }
          </div>
        </div>
      );
    };

  } // namespace components

} // namespace pickers
