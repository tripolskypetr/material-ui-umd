namespace pickers {

  export namespace components {

    function getStyles(props, context, state) {
      const { datePicker } = context.muiTheme;
      const { selectedYear } = state;
      const isLandscape = props.mode === 'landscape';

      const styles = {
        root: {
          width: isLandscape ? 165 : '100%',
          height: isLandscape ? 330 : 'auto',
          float: isLandscape ? 'left' : 'none',
          fontWeight: 700,
          display: 'inline-block',
          backgroundColor: datePicker.headerColor,
          borderTopLeftRadius: 2,
          borderTopRightRadius: isLandscape ? 0 : 2,
          borderBottomLeftRadius: isLandscape ? 2 : 0,
          color: datePicker.textColor,
          padding: 20,
          boxSizing: 'border-box',
        },
        monthDay: {
          display: 'block',
          fontSize: 36,
          lineHeight: '36px',
          height: props.mode === 'landscape' ? '100%' : 38,
          opacity: selectedYear ? 0.7 : 1,
          width: '100%',
          fontWeight: '500',
        },
        monthDayTitle: {
          cursor: !selectedYear ? 'default' : 'pointer',
          width: '100%',
          display: 'block',
        },
        year: {
          margin: 0,
          fontSize: 16,
          fontWeight: '500',
          lineHeight: '16px',
          height: 16,
          opacity: selectedYear ? 1 : 0.7,
          marginBottom: 10,
        },
        yearTitle: {
          cursor: props.disableYearSelection || selectedYear ? 'default' : 'pointer',
        },
      };

      return styles;
    }

    export class DateDisplay extends React.Component<any, any> {

      static defaultProps = {
        disableYearSelection: false,
        monthDaySelected: true,
      };

      state = {
        selectedYear: false,
        transitionDirection: 'up',
      };

      componentWillMount() {
        if (!this.props.monthDaySelected) {
          this.setState({ selectedYear: true });
        }
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.selectedDate !== this.props.selectedDate) {
          const direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
          this.setState({
            transitionDirection: direction,
          });
        }

        if (nextProps.monthDaySelected !== undefined) {
          this.setState({
            selectedYear: !nextProps.monthDaySelected,
          });
        }
      }

      handleClickMonthDay = () => {
        if (this.props.onClickMonthDay && this.state.selectedYear) {
          this.props.onClickMonthDay();
        }

        this.setState({ selectedYear: false });
      };

      handleClickYear = () => {
        if (this.props.onClickYear && !this.props.disableYearSelection && !this.state.selectedYear) {
          this.props.onClickYear();
        }

        if (!this.props.disableYearSelection) {
          this.setState({ selectedYear: true });
        }
      };

      render() {
        const {
          DateTimeFormat,
          disableYearSelection, // eslint-disable-line no-unused-vars
          locale,
          mode, // eslint-disable-line no-unused-vars
          monthDaySelected, // eslint-disable-line no-unused-vars
          onClickMonthDay, // eslint-disable-line no-unused-vars
          onClickYear, // eslint-disable-line no-unused-vars
          selectedDate, // eslint-disable-line no-unused-vars
          style,
          ...other
        } = this.props;

        const { prepareStyles } = this.context.muiTheme;
        const styles = getStyles(this.props, this.context, this.state);

        const year = new DateTimeFormat(locale, {
          year: 'numeric',
        }).format(selectedDate);

        const dateTime = new DateTimeFormat(locale, {
          month: 'short',
          weekday: 'short',
          day: '2-digit',
        }).format(selectedDate);

        return (
          <div {...other} style={prepareStyles(styles.root, style)}>
            <div key={year} style={styles.yearTitle} onClick={this.handleClickYear}>
              {year}
            </div>
            <div onClick={this.handleClickMonthDay}
              style={styles.monthDayTitle}
              key={dateTime}>
              {dateTime}
            </div>
          </div>
        );
      }

    } // class DateDisplay

  } // namespace components

} // namespace pickers
