namespace pickers {

  const {
    makeStyles,
  } = material.core;

  export namespace components {

    const positions = [
      [0, 5],
      [55, 19.6],
      [94.4, 59.5],
      [109, 114],
      [94.4, 168.5],
      [54.5, 208.4],
      [0, 223],
      [-54.5, 208.4],
      [-94.4, 168.5],
      [-109, 114],
      [-94.4, 59.5],
      [-54.5, 19.6],
    ];

    const useStyles = makeStyles((theme) => ({
      clockNumber: {
        width: 32,
        height: 32,
        position: 'absolute',
        left: 'calc(50% - 16px)',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        color: theme.palette.type === 'light'
          ? theme.palette.text.primary
          : theme.palette.text.hint
      },
      selected: {
        color: 'white',
      },
    }));

    export const ClockNumber = ({
      selected = false,
      label = '',
      index = 0,
    }) => {
      const classes = useStyles();
      const className = classNames(classes.clockNumber, {
        [classes.selected]: selected,
      });
      const getTransformStyle = (index) => {
        const position = positions[index];
        return {
          transform: `translate(${position[0]}px, ${position[1]}px`,
        };
      };
      return (
        <div className={className}
          style={getTransformStyle(index)}>
          { label }
        </div>
      );
    };

  } // namespace components

} // namespace pickers
