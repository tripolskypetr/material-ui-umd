namespace pickers {

  const {
    dateTimeFormat,
  } = utils;

  const {
    Dialog,
  } = material.core;

  export namespace components {

    export class DatePickerDialog extends React.Component<any, any> {

      rootRef: any = React.createRef();
      calendarRef: any = React.createRef();

      static defaultProps = {
        DateTimeFormat: dateTimeFormat,
        cancelLabel: 'Cancel',
        container: 'dialog',
        locale: 'en-US',
        okLabel: 'OK',
        openToYearSelection: false,
      };

      state = {
        open: true,
      };

      show = () => {
        if (this.props.onShow && !this.state.open) {
          this.props.onShow();
        }

        this.setState({
          open: true,
        });
      };

      dismiss = () => {
        if (this.props.onDismiss && this.state.open) {
          this.props.onDismiss();
        }

        this.setState({
          open: false,
        });
      };

      handleClickDay = () => {
        if (this.props.autoOk) {
          setTimeout(this.handleClickOk, 300);
        }
      };

      handleClickCancel = () => {
        this.dismiss();
      };

      handleRequestClose = () => {
        this.dismiss();
      };

      handleClickOk = () => {
        if (this.props.onAccept && !this.calendarRef.isSelectedDateDisabled()) {
          this.props.onAccept(this.calendarRef.getSelectedDate());
        }

        this.setState({
          open: false,
        });
      };

      render() {
        const {
          DateTimeFormat,
          autoOk,
          cancelLabel,
          container,
          containerStyle,
          disableYearSelection,
          initialDate,
          firstDayOfWeek,
          locale,
          maxDate,
          minDate,
          mode,
          okLabel,
          onAccept, // eslint-disable-line no-unused-vars
          onDismiss, // eslint-disable-line no-unused-vars
          onShow, // eslint-disable-line no-unused-vars
          openToYearSelection,
          shouldDisableDate,
          hideCalendarDate,
          style, // eslint-disable-line no-unused-vars
          animation,
          utils,
          ...other
        } = this.props;

        const { open } = this.state;

        const styles = {
          dialogContent: {
            width: (!hideCalendarDate && mode === 'landscape') ? 479 : 310,
          },
          dialogBodyContent: {
            padding: 0,
            minHeight: (hideCalendarDate || mode === 'landscape') ? 330 : 434,
            minWidth: (hideCalendarDate || mode !== 'landscape') ? 310 : 479,
          },
        };

        return (
          <div {...other} ref="root">
            <Dialog
              anchorEl={this.rootRef} // For Popover
              animation={animation} // For Popover
              bodyStyle={styles.dialogBodyContent}
              contentStyle={styles.dialogContent}
              ref="dialog"
              repositionOnUpdate={true}
              open={open}
              onRequestClose={this.handleRequestClose}
              style={Object.assign(styles.dialogBodyContent, containerStyle)}
            >
              <Calendar
                autoOk={autoOk}
                DateTimeFormat={DateTimeFormat}
                cancelLabel={cancelLabel}
                disableYearSelection={disableYearSelection}
                firstDayOfWeek={firstDayOfWeek}
                initialDate={initialDate}
                locale={locale}
                onClickDay={this.handleClickDay}
                maxDate={maxDate}
                minDate={minDate}
                mode={mode}
                open={open}
                ref={this.calendarRef}
                onClickCancel={this.handleClickCancel}
                onClickOk={this.handleClickOk}
                okLabel={okLabel}
                openToYearSelection={openToYearSelection}
                shouldDisableDate={shouldDisableDate}
                hideCalendarDate={hideCalendarDate}
                utils={utils}
              />
            </Dialog>
          </div>
        );
      }

    } // class DatePickerDialog

  } // namespace components

} // namespace pickers
