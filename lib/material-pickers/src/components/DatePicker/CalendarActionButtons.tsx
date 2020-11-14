namespace pickers {

  const {
    Button,
  } = material.core;

  export namespace components {

    export class CalendarActionButtons extends React.Component<any, any> {

      calendarRef: any = React.createRef();

      render() {
        const {cancelLabel, okLabel} = this.props;

        const styles: any = {
          root: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            margin: 0,
            maxHeight: 48,
            padding: 0,
          },
          flatButtons: {
            fontsize: 14,
            margin: '4px 8px 8px 0px',
            maxHeight: 36,
            minWidth: 64,
            padding: 0,
          },
        };

        return (
          <div style={styles.root} >
            <Button
              label={cancelLabel}
              onClick={this.props.onClickCancel}
              primary={true}
              style={styles.flatButtons}
            />
            {!this.props.autoOk &&
              <Button
                disabled={this.calendarRef && this.calendarRef.isSelectedDateDisabled()}
                label={okLabel}
                onClick={this.props.onClickOk}
                primary={true}
                style={styles.flatButtons}
              />
            }
          </div>
        );
      }

    } // class CalendarActionButton

  } // namespace components

} // namespace pickers
