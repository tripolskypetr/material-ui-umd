
/// <reference path="../components/index.ts"/>

namespace mark {

  const {
    rect,
    square,
  } = webcomponents;

  const {
    Files,
    Selector,
    CordPicker,
  } = components;

  const {
    Drawer,
  } = material.core;

  const {
    Fragment
  } = React;

  const {
    max
  } = Math;

  const {
    makeStyles
  } = material.styles;

  const {
    useState,
    useEffect,
  } = React;

  const uuid = () => Math.random().toString(36).substring(7);

  interface ICord {
    type: 'rect' | 'square',
    id: string,
    top: number,
    left: number,
    width: number,
    height: number,
  };

  const defaultCord = (type) => ({
    type,
    id: uuid(),
    top: 50,
    left: 50,
    width: 100,
    height: 100,
  });

  const deepCompare = (low1: any[], low2: any[]) => {
    if (low1.length !== low2.length) {
      return false;
    } else {
      const l1: any[][] = low1.sort(([id1, type1], [id2, type2]) => `${id1}${type1}`.localeCompare(`${id2}${type2}`));
      const l2: any[][] = low1.sort(([id1, type1], [id2, type2]) => `${id1}${type1}`.localeCompare(`${id2}${type2}`));
      const pairs = l1.map((item, index) => [item, l2[index]])
      for (const [current, other] of pairs) {
        if (current.length !== other.length) {
          return false;
        } else {
          const difference = current.filter((item, index) => item !== other[index]);
          if (difference.length) {
            return false;
          }
        }
      }
      return true;
    }
  };

  const debounce = (f, t) => {
    return function (args) {
      const previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall && ((this.lastCall - previousCall) <= t)) {
        clearTimeout(this.lastCallTimer);
      }
      this.lastCallTimer = setTimeout(() => f(args), t);
    }
  };

  const throttle = (f, t) => {
    return function (args) {
      const previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall === undefined
          || (this.lastCall - previousCall) > t) {
        f(args);
      }
    }
  };

  const useStyles = makeStyles((theme) => ({
    drawer: {
      minWidth: 240,
    },
    adjust: {
      marginLeft: 240
    },
    container: {
      margin: 24,
    }
  }));

  const lowLevelCords= (cords: ICord[]) => cords.map(({
    id, type, height, width, top, left
  }) => type === 'rect' ? rect(id, top, left, height, width)
   : type === 'square' ? square(id, top, left, max(height, width))
   : console.error('lowLevelCords invalid cord type', type)
  );

  export namespace pages {

    export const App = () => {

      const classes = useStyles();

      const [cords, setCords] = useState<ICord[]>([]);
      const [lowCords, setLowCords] = useState([]);

      const onSave = () => console.log('save');
      const onAddRect = () => setCords((cords) => [...cords, defaultCord('rect')]);
      const onDelete = (id) => setCords((cords) => cords.filter((c) => c.id !== id));
      const onAddSquare = () => setCords((cords) => [...cords, defaultCord('square')]);

      const onChange = ({type, id, top, left, height, width}) => setCords(
        (cords) => cords.map((c) => c.id === id ? {
          type, id, top, left, height, width
        } : c)
      );

      useEffect(() => {
        const newCords = lowLevelCords(cords);
        if (!deepCompare(newCords, lowCords)) {
          setLowCords(newCords);
        }
      }, [cords]);

      return (
        <Fragment>
          <Drawer variant="permanent" open={true} className={classes.drawer}>
            <Files/>
          </Drawer>
          <div className={classes.adjust}>
            <Selector
              cords={lowCords}
              onChange={debounce(onChange, 200)}/>
            <div className={classes.container}>
              <CordPicker
                cords={cords}
                onSave={onSave}
                onDelete={onDelete}
                onAddRect={onAddRect}
                onAddSquare={onAddSquare}/>
            </div>
          </div>
        </Fragment>
      );
    };

  } // namespace components

} // namespace mark
