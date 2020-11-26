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
        touchAction: 'none',
      },
    });

    const touch = new class {
      private lastOffsetX;
      private lastOffsetY;
      toMouseEvent = ({target, targetTouches}) => {
        const {left, top} = target.getBoundingClientRect();
        const {scrollX, scrollY} = window;
        const [touch] = targetTouches;
        if (touch) {
          const {pageX, pageY} = touch;
          this.lastOffsetX = pageX - scrollX - left;
          this.lastOffsetY = pageY - scrollY - top;
        }
        return {
          offsetX: this.lastOffsetX,
          offsetY: this.lastOffsetY,
        };
      };
    };

    export const Clock = ({
      type = '',
      value = 0,
      children = null,
      onChange = (value) => console.log({value}),
    }) => {
      const classes = useStyles();

      const setTime = (e) => {
        const value = type === clockType.MINUTES
          ? getMinutes(e.offsetX, e.offsetY)
          : getHours(e.offsetX, e.offsetY);
        onChange(value);
      };

      const handleMove = (e) => {
        e.preventDefault();
        if (e.buttons !== 1) { return; }
        setTime(e.nativeEvent);
      };

      const handleTouchMove = (e) => {
        e.stopPropagation();
        setTime(touch.toMouseEvent(e));
        return true;
      };

      const hasSelected = () => {
        if (type === clockType.HOURS) {
          return true;
        }
        return value % 5 === 0;
      };

      return (
        <div className={classes.container}>
          <div className={classes.clock}>
            <div
              className={classes.squareMask}
              onMouseMove={handleMove}
              onTouchMove={handleTouchMove}
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
