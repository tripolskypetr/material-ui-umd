
/// <reference path="./Selector.tsx"/>
/// <reference path="./CordPicker.tsx"/>
/// <reference path="../utils/index.ts"/>

namespace mark {

  const {
    uuid,
    color,
    openMarkup,
    readExportCord,
  } = utils;

  const {
    Fragment,
    useState,
    useEffect,
  } = React;

  const {
    roi,
    rect,
    square,
  } = webcomponents;

  const {
    makeStyles,
  } = material.styles;

  const {
    max,
  } = Math;

  const {
    Typography,
  } = material.core;

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
        const l2: any[][] = low2.sort(([id1, type1], [id2, type2]) => `${id1}${type1}`.localeCompare(`${id2}${type2}`));
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

    const lowLevelCords = (cords: ICord[], naturalHeight = 100, naturalWidth = 100) => cords.map(({
      id, type, height, width, top, left, color
    }) => type === 'rect' ? rect(id, top, left, height, width, color)
      : type === 'square' ? square(id, top, left, max(height, width), color)
      : type === 'roi' ? roi(top, left, naturalWidth - left - width, naturalHeight - top - height, color)
      : console.error('lowLevelCords invalid cord type', type)
    );

    const useStyles = makeStyles((theme) => ({
      container: {
        margin: 24,
      },
      fileName: {
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
      name = 'filename.png',
      initialCords = [],
      naturalHeight = 100,
      naturalWidth = 100,
      onCrop = (crop) => console.log({crop}),
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

      const onLoad = async () => {
        const lines = await openMarkup();
        setCords([]);
        setTimeout(() => setCords(readExportCord({
          naturalHeight,
          naturalWidth,
          lines,
        })));
      };

      const onCropChanged = (enabled = false) => {
        setCords((cords) => {
          if (enabled && !cords.find((c) => c.type === 'roi')) {
            const side = Math.min(naturalWidth, naturalHeight) * 0.05;
            const roi: ICord = {
              type: 'roi',
              id: 'roi',
              color: '#ff00ff',
              top: side,
              left: side,
              height: naturalHeight - (2 * side),
              width: naturalWidth - (2 * side),
              name: 'Roi area',
            };
            return [...cords, roi];
          } else if (!enabled) {
            return cords.filter((c) => c.type !== 'roi');
          }
        });
        setTimeout(() => onCrop(enabled));
      };

      useEffect(() => {
        const newCords = lowLevelCords(initialCords, naturalHeight, naturalWidth);
        if ((newCords as any).flat(Infinity).find((v) => typeof v === 'number' && isNaN(v)) !== undefined) {
          return;
        }
        if (!deepCompare(newCords, lowCords)) {
          setLowCords(newCords);
          setCords(initialCords);
        }
        onChange(cords);
      }, [initialCords]);

      return (
        <Fragment>
          <Typography className={classes.fileName} variant="h4">
            {name}
          </Typography>
          <Selector
            cords={lowCords}
            src={src}
            id={src}
            naturalHeight={naturalHeight}
            naturalWidth={naturalWidth}
            onChange={debounce(onChangeCords, 200)} />
          <div className={classes.container}>
            <CordPicker
              cords={cords}
              onNameChanged={onNameChanged}
              onSave={() => onSave(cords)}
              onCrop={onCropChanged}
              onLoad={onLoad}
              onDelete={onDelete}
              onAddRect={onAddRect}
              onAddSquare={onAddSquare} />
          </div>
        </Fragment>
      );

    };

  } // namespace components

} // namespace mark
