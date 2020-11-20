namespace pickers {

  const {
    makeStyles,
  } = material.core;

  const {
    constants: clockType,
  } = utils;

  const {
    getMinutes,
    getHours,
  } = utils;

  export namespace components {

    const useStyles = makeStyles({
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 40,
      },
      clock: {
        backgroundColor: 'rgba(0,0,0,.07)',
        borderRadius: '50%',
        height: 260,
        width: 260,
        position: 'relative',
        pointerEvents: 'none',
      },
      squareMask: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'auto',
      },
    });

    export const Clock = ({
      type = '',
      value = 0,
      children = null,
      onChange = (value, finish) => console.log({value, finish}),
    }) => {
      const classes = useStyles();

      const setTime = (e, finish) => {
        if (typeof e.offsetX === 'undefined') {
          console.warn('Touch events not supporting');
        }
        const value = type === clockType.MINUTES
          ? getMinutes(e.offsetX, e.offsetY)
          : getHours(e.offsetX, e.offsetY);
        onChange(value, finish);
      };

      const handleUp = (event) => {
        event.preventDefault();
        setTime(event.nativeEvent, true);
      };

      const handleMove = (e) => {
        e.preventDefault();
        if (e.buttons !== 1) { return; }
        setTime(e.nativeEvent, false);
      };

      const hasSelected = () => {
        if (type === clockType.HOURS) {
          return true;
        }
        return value % 5 === 0;
      };

      return (
        <div className={classes.container}>
          <div
            className={classes.clock}
          >
            {/*onTouchMove={handleTouchMove}*/}
            {/*onTouchEnd={handleTouchEnd}*/}
            <div
              className={classes.squareMask}
              onMouseUp={handleUp}
              onMouseMove={handleMove}
            />
            <ClockPointer
              max={type === clockType.HOURS ? 12 : 60}
              hasSelected={hasSelected()}
              value={value}
            />
            { children }
          </div>
        </div>
      );
    };

  } // namespace components

} // namespace pickers
