
/// <reference path="./Selector.tsx"/>
/// <reference path="./CordPicker.tsx"/>
/// <reference path="../utils/index.ts"/>

namespace mark {

  const {
    uuid,
    color,
  } = utils;

  const {
    Fragment,
    useState,
    useEffect,
  } = React;

  const {
    rect,
    square,
  } = webcomponents;

  const {
    makeStyles
  } = material.styles;

  const {
    max
  } = Math;

  export namespace components {

    const debounce = (f, t) => {
      return function (args) {
        const previousCall = this.lastCall;
        this.lastCall = Date.now();
        if (previousCall && ((this.lastCall - previousCall) <= t)) {
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

    const lowLevelCords = (cords: ICord[]) => cords.map(({
      id, type, height, width, top, left, color
    }) => type === 'rect' ? rect(id, top, left, height, width, color)
      : type === 'square' ? square(id, top, left, max(height, width), color)
      : console.error('lowLevelCords invalid cord type', type)
    );

    const useStyles = makeStyles((theme) => ({
      container: {
        margin: 24,
      },
    }));

    const defaultCord = (type) => ({
      type,
      id: uuid(),
      top: 50,
      left: 50,
      width: 100,
      height: 100,
      name: 'some-class',
      color: color(),
    });

    export const Editor = ({
      src = 'image.png',
      initialCords = [],
      onSave = (cords) => console.log({cords}),
      onChange = (cords) => console.log({cords}),
    }) => {

      const [cords, setCords] = useState<ICord[]>(initialCords);
      const [lowCords, setLowCords] = useState([]);
      const classes = useStyles();

      const onAddRect = () => setCords((cords) => [...cords, defaultCord('rect')]);
      const onDelete = (id) => setCords((cords) => cords.filter((c) => c.id !== id));
      const onAddSquare = () => setCords((cords) => [...cords, defaultCord('square')]);
      const onNameChanged = (id, name) => setCords((cords) => cords.map((c) => c.id === id ? {...c, name} : c));

      const onChangeCords = ({ type, id, top, left, height, width }) => setCords(
        (cords) => cords.map((c) => c.id === id ? {
          type, id, top, left, height, width, name: c.name, color: c.color
        } : c)
      );

      useEffect(() => {
        const newCords = lowLevelCords(cords);
        if (!deepCompare(newCords, lowCords)) {
          setLowCords(newCords);
        }
        onChange(cords);
      }, [cords]);

      useEffect(() => {
        setCords(initialCords);
      }, [initialCords]);

      return (
        <Fragment>
          <Selector
            cords={lowCords}
            src={src}
            id={src}
            onChange={debounce(onChangeCords, 200)} />
          <div className={classes.container}>
            <CordPicker
              cords={cords}
              onNameChanged={onNameChanged}
              onSave={() => onSave(cords)}
              onDelete={onDelete}
              onAddRect={onAddRect}
              onAddSquare={onAddSquare} />
          </div>
        </Fragment>
      );

    };

  } // namespace components

} // namespace mark
