namespace pickers {

  const {
    IconButton,
  } = material.core;

  const {
    ArrowRight,
    ArrowLeft,
  } = material.icons;

  export namespace components {

    const styles = {
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'inherit',
        height: 48,
      },
      titleDiv: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        width: '100%',
      },
      titleText: {
        height: 'inherit',
        paddingTop: 12,
      },
    };

    export class CalendarToolbar extends React.Component<any, any> {

      static defaultProps = {
        nextMonth: true,
        prevMonth: true,
      };

      handleClickPrevMonth = () => {
        if (this.props.onMonthChange) {
          this.props.onMonthChange(-1);
        }
      };

      handleClickNextMonth = () => {
        if (this.props.onMonthChange) {
          this.props.onMonthChange(1);
        }
      };

      render() {
        const { DateTimeFormat, locale, displayDate } = this.props;

        const dateTimeFormatted = new DateTimeFormat(locale, {
          month: 'long',
          year: 'numeric',
        }).format(displayDate);

        const nextButtonIcon = ArrowRight;
        const prevButtonIcon = ArrowLeft;

        return (
          <div style={styles.root}>
            <IconButton
              disabled={!this.props.prevMonth}
              onClick={this.handleClickPrevMonth}
            >
              {prevButtonIcon}
            </IconButton>
            <div key={dateTimeFormatted} style={styles.titleText}>
              {dateTimeFormatted}
            </div>
            <IconButton
              disabled={!this.props.nextMonth}
              onClick={this.handleClickNextMonth}
            >
              {nextButtonIcon}
            </IconButton>
          </div>
        );
      }

    } // class CalendarToolbar

  } // namespace components

} // namespace pickers
