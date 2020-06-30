
/// <reference path="../webcomponents/index.ts"/>

namespace mark {

  const {
    useRef,
    useEffect,
    useLayoutEffect,
  } = React;

  const {
    makeStyles
  } = material.styles;

  export namespace components {

    const {
      areaSelector
    } = webcomponents;

    const useStyles = makeStyles((theme) => ({
      parent: {
        margin: '24px',
        position: 'relative',
        width: 'calc(100vw - 288px)',
      },
    }));

    export const Selector = ({
      src = 'image.png',
      id = 'unset',
      cords = [],
      naturalHeight = 100,
      naturalWidth = 100,
      onChange = (...args) => console.log({args}),
    }) => {

      const parentRef = useRef(null);
      const mountRef = useRef(true);
      const classes = useStyles();

      useLayoutEffect(() => {
        const {current} = parentRef;
        current.innerHTML = `
          <area-selector
            imageSrc="${src}"
            id="${id}">
          </area-selector>
        `;
        const roi = (args) => {
          const [top, left, right, bottom] = args;
          const {current} = mountRef;
          if (current)
            onChange({
              type: 'roi', id: 'roi', top, left,
              height: naturalHeight - top - bottom,
              width: naturalWidth - left - right,
            });
        };
        const rect = (args) => {
          const [id, top, left, height, width] = args;
          const {current} = mountRef;
          if (current)
            onChange({type: 'rect', id, top, left, height, width});
        };
        const square = (args) => {
          const [id, top, left, side] = args;
          const [height, width] = [...new Array(2)].map(() => side);
          const {current} = mountRef;
          if (current)
            onChange({type: 'square', id, top, left, height, width});
        };
        areaSelector(
          (refId, ref) => {
            if (refId === id) {
              ref.controls = cords;
            }
          },
          (refId, type, ...args) => {
            if (args.find((v) => typeof v === 'number' && isNaN(v)) !== undefined) {
              return;
            } else if (refId === id) {
              switch (type) {
                case 'rect-area-changed':
                  rect(args);
                  break;
                case 'roi-area-changed':
                  roi(args);
                  break;
                case 'square-area-changed':
                  square(args);
                  break;
                default:
                  throw new Error('Selector unknown event type');
              }
            }
          },
        );
        mountRef.current = true;
        return () => mountRef.current = false;
      }, [src, id, cords]);

      return (
        <div className={classes.parent} ref={parentRef}>
          <img src={src}/>
        </div>
      );
    };

  } // namespace components

} // namespace mark
