
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

  const useStyles = makeStyles((theme) => ({
    parent: {
      margin: '24px',
      position: 'relative',
      width: 'calc(100vw - 288px)',
    },
  }));

  export namespace components {

    const {
      areaSelector
    } = webcomponents;

    export const Selector = ({
      src = 'image.png',
      id = 'unset',
      cords = [],
      onChange = (...args) => console.log({args}),
    }) => {

      const parentRef = useRef(null);
      const areaRef = useRef(null);
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
          const [id, top, left, right, bottom] = args;
          onChange({type: 'roi', id, top, left, right, bottom});
        };
        const rect = (args) => {
          const [id, top, left, height, width] = args;
          onChange({type: 'rect', top, left, height, width, id});
        };
        const square = (args) => {
          const [id, top, left, side] = args;
          onChange({type: 'square', id, top, left, side});
        };
        areaSelector(
          (refId, ref) => {
            if (refId === id) {
              areaRef.current = ref;
              ref.controls = cords;
            }
          },
          (refId, type, ...args) => {
            if (refId === id) {
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
      }, [src, id]);

      useEffect(() => {
        const {current} = areaRef;
        if (current) {
          current.controls = cords;
        }
      }, [cords]);

      return (
        <div className={classes.parent} ref={parentRef}></div>
      );
    };

  } // namespace components

} // namespace mark
