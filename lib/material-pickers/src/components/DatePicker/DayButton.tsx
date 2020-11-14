namespace pickers {

  const {
    isEqualDate,
  } = utils;

  const {
    Button,
  } = material.core;

  export namespace components {

    function getStyles(props, context, state) {
      const { date, disabled, selected } = props;
      const { hover } = state;
      const { baseTheme, datePicker } = context.muiTheme;

      let labelColor = baseTheme.palette.textColor;
      let buttonStateOpacity = 0;
      let buttonStateTransform = 'scale(0)';

      if (hover || selected) {
        labelColor = datePicker.selectTextColor;
        buttonStateOpacity = selected ? 1 : 0.6;
        buttonStateTransform = 'scale(1)';
      } else if (isEqualDate(date, new Date())) {
        labelColor = datePicker.color;
      }

      return {
        root: {
          boxSizing: 'border-box',
          fontWeight: '400',
          opacity: disabled && '0.4',
          padding: '4px 0px',
          position: 'relative',
          WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
          width: 42,
        },
        label: {
          color: labelColor,
          fontWeight: '400',
          position: 'relative',
        },
        buttonState: {
          backgroundColor: datePicker.selectColor,
          borderRadius: '50%',
          height: 34,
          left: 4,
          opacity: buttonStateOpacity,
          position: 'absolute',
          top: 0,
          transform: buttonStateTransform,
          width: 34,
        },
      };
    }

    export class DayButton extends React.Component<any, any> {

      static defaultProps = {
        selected: false,
        disabled: false,
      };

      state = {
        hover: false,
      };

      handleMouseEnter = () => {
        if (!this.props.disabled) {
          this.setState({ hover: true });
        }
      };

      handleMouseLeave = () => {
        if (!this.props.disabled) {
          this.setState({ hover: false });
        }
      };

      handleClick = (event) => {
        if (!this.props.disabled && this.props.onClick) {
          this.props.onClick(event, this.props.date);
        }
      };

      handleKeyboardFocus = (event, keyboardFocused) => {
        if (!this.props.disabled && this.props.onKeyboardFocus) {
          this.props.onKeyboardFocus(event, keyboardFocused, this.props.date);
        }
      };

      render() {
        const {
          DateTimeFormat,
          date,
          disabled,
          locale,
          onClick, // eslint-disable-line no-unused-vars
          selected, // eslint-disable-line no-unused-vars
          ...other
        } = this.props;

        const { prepareStyles } = this.context.muiTheme;
        const styles = getStyles(this.props, this.context, this.state);

        return date ? (
          <Button
            {...other}
            disabled={disabled}
            disableFocusRipple={true}
            disableTouchRipple={true}
            onKeyboardFocus={this.handleKeyboardFocus}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.handleClick}
            style={styles.root}
          >
            <div style={prepareStyles(styles.buttonState)} />
            <span style={prepareStyles(styles.label)}>
              {new DateTimeFormat(locale, {
                day: 'numeric',
              }).format(date)}
            </span>
          </Button>
        ) : (
            <span style={prepareStyles(styles.root)} />
          );
      }

    } // class DayButton

  } // namespace components

} // namespace pickers
