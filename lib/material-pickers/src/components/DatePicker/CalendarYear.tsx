namespace pickers {

  export namespace components {

    export class CalendarYear extends React.Component<any, any> {

      selectedYearButton: any = React.createRef();

      componentDidMount() {
        this.scrollToSelectedYear();
      }

      componentDidUpdate() {
        this.scrollToSelectedYear();
      }

      getYears() {
        const {
          DateTimeFormat,
          locale,
          minDate,
          maxDate,
          selectedDate,
          utils,
        } = this.props;

        const minYear = utils.getYear(minDate);
        const maxYear = utils.getYear(maxDate);
        const years = [];

        for (let year = minYear; year <= maxYear; year++) {
          const selected = utils.getYear(selectedDate) === year;
          const selectedProps = {};

          const yearFormated = new DateTimeFormat(locale, {
            year: 'numeric',
          }).format(utils.setYear(selectedDate, year));

          const yearButton = (
            <YearButton
              ref={selected ? this.selectedYearButton : undefined}
              key={`yb${year}`}
              onClick={this.handleClickYear}
              selected={selected}
              year={year}
              utils={utils}
              {...selectedProps}
            >
              {yearFormated}
            </YearButton>
          );

          years.push(yearButton);
        }

        return years;
      }

      scrollToSelectedYear() {
        if (this.selectedYearButton === undefined) {
          return;
        }

        const container: any = ReactDOM.findDOMNode(this);
        const yearButtonNode: any = ReactDOM.findDOMNode(this.selectedYearButton);

        const containerHeight = container.clientHeight;
        const yearButtonNodeHeight = yearButtonNode.clientHeight || 32;

        const scrollYOffset = (yearButtonNode.offsetTop + yearButtonNodeHeight / 2) - containerHeight / 2;
        container.scrollTop = scrollYOffset;
      }

      handleClickYear = (event, year) => {
        if (this.props.onClickYear) {
          this.props.onClickYear(event, year);
        }
      };

      render() {
        const {
          prepareStyles,
          datePicker: {
            calendarYearBackgroundColor,
          },
        } = this.context.muiTheme;

        const styles = {
          root: {
            backgroundColor: calendarYearBackgroundColor,
            height: 'inherit',
            lineHeight: '35px',
            overflowX: 'hidden',
            overflowY: 'scroll',
            position: 'relative',
          },
          child: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '100%',
          },
        };

        return (
          <div style={prepareStyles(styles.root)}>
            <div style={prepareStyles(styles.child)}>
              {this.getYears()}
            </div>
          </div>
        );
      }

    } // class CalendarYear

  } // namespace components

} // namespace pickers
