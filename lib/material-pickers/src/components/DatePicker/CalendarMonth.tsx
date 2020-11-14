namespace pickers {

  const {
    isBetweenDates,
    isEqualDate,
  } = utils;

  export namespace components {

    const styles: any = {
      root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        fontWeight: 400,
        height: 228,
        lineHeight: 2,
        position: 'relative',
        textAlign: 'center',
        MozPaddingStart: 0,
      },
      week: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 34,
        marginBottom: 2,
      },
    };

    export class CalendarMonth extends React.Component<any, any> {

      selectedDateDisabled = false;

      isSelectedDateDisabled() {
        return this.selectedDateDisabled;
      }

      handleClickDay = (event, date) => {
        if (this.props.onClickDay) {
          this.props.onClickDay(event, date);
        }
      };

      shouldDisableDate(day) {
        if (day === null) return false;
        let disabled = !isBetweenDates(day, this.props.minDate, this.props.maxDate);
        if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);

        return disabled;
      }

      getWeekElements() {
        const weekArray = this.props.utils.getWeekArray(this.props.displayDate, this.props.firstDayOfWeek);

        return weekArray.map((week, i) => {
          return (
            <div key={i} style={styles.week}>
              {this.getDayElements(week, i)}
            </div>
          );
        }, this);
      }

      getDayElements(week, i) {
        const {
          DateTimeFormat,
          locale,
          selectedDate,
        } = this.props;

        return week.map((day, j) => {
          const isSameDate = isEqualDate(selectedDate, day);
          const disabled = this.shouldDisableDate(day);
          const selected = !disabled && isSameDate;

          if (isSameDate) {
            this.selectedDateDisabled = disabled;
          }

          return (
            <DayButton
              DateTimeFormat={DateTimeFormat}
              locale={locale}
              date={day}
              disabled={disabled}
              key={`db${(i + j)}`}
              onClick={this.handleClickDay}
              selected={selected}
            />
          );
        }, this);
      }

      render() {
        return (
          <div style={styles.root}>
            {this.getWeekElements()}
          </div>
        );
      }

    } // class CalendarMounth

  } // namespace components

} // namespace pickers
