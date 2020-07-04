
/// <reference path="../utils/index.ts"/>

namespace mark {

  const {
    Fragment,
    useRef,
    useState,
    useEffect,
    useCallback,
  } = React;

  const {
    Box,
    Slide,
    Dialog,
    Typography,
    CircularProgress,
  } = material.core;

  const {
    loadFile,
    loadMarkup,
    readExportCord,
  } = utils;

  const {
    makeStyles,
  } = material.styles;

  export namespace components {

    const useStyles = makeStyles(() => ({
      fullscreen: {
        position: 'fixed',
        zIndex: '99999',
        height: '100vh',
        width: '100vw',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px',
        background: '#00000080',
      },
      content: {
        minWidth: '325px',
        padding: '10px',
      },
      adjust: {
        padding: '15px',
      }
    }));

    const Transition = React.forwardRef((props, ref) => (
      <Slide direction="up" ref={ref} {...props} />
    ));

    export const DragAndDrop = ({
      onDropped = (files, cords) => console.log({files, cords}),
    }) => {

      const [drag, setDrag] = useState(false);
      const [drop, setDrop] = useState<{total: number, current: number}>(null);
      const counter = useRef(0);
      const classes = useStyles();

      const dragHandler = useCallback((v) => setDrag(v), [drag]);

      const dropHandler = useCallback((e) => {
        e.preventDefault();
        if (drop !== null) {
          return;
        }
        const {dataTransfer} = e;
        const [markups, images] = [...new Array(2)].map(() => new Map());
        (Array.from(dataTransfer.files) as File[]).forEach((file) => {
          const ext = file.name.split('.').reverse()[0];
          if (ext === 'png') {
            images.set(file.name, file);
          } else if (ext === 'jpg') {
            images.set(file.name, file);
          } else if (ext === 'txt') {
            markups.set(file.name, file);
          }
        })

        const total = images.size;
        const files = [];
        const cords = [];
        let current = 0;

        setTimeout(async () => {
          for (const [name, f] of Array.from(images)) {
            const markup = name.split('.')[0] + '.txt';
            const file = await loadFile(f);
            files.push(file);
            if (markups.has(markup)) {
              cords.push([file.url, await readExportCord({
                lines: await loadMarkup(markups.get(markup)),
                naturalHeight: file.naturalHeight,
                naturalWidth: file.naturalWidth,
              })]);
            }
            current = current + 1;
            setDrop({current, total});
          }
          onDropped(files, new Map(cords));
          setDrag(false);
          setDrop(null);
        });

        setDrop({current, total});

      }, [drop]);

      useEffect(() => {
        
        const handler = (enter = true) => (e) => {
          e.preventDefault();
          counter.current += enter ? 1 : -1;
          dragHandler(counter.current > 0);
        };

        const passive = (e) => e.preventDefault();
        const leave = handler(false);
        const enter = handler(true);

        document.body.addEventListener('dragenter', enter);
        document.body.addEventListener('dragleave', leave);
        document.body.addEventListener('dragover', passive);
        document.body.addEventListener('drop', dropHandler);
        return () => {
          document.body.removeEventListener('dragenter', enter);
          document.body.removeEventListener('dragleave', leave);
          document.body.removeEventListener('dragover', passive);
          document.body.removeEventListener('drop', dropHandler);
        };
      }, [dragHandler, dropHandler]);

      if (drag && drop === null) {
        return (
          <div className={classes.fullscreen}>
            <Typography className={classes.adjust} variant="h4">
              Release files to continue
            </Typography>
          </div>
        );
      } else if (drop !== null) {
        return (
          <Dialog TransitionComponent={Transition} open={true}>
            <Box
              className={classes.content}
              display="flex"
              flexDirection="row"
              alignItems="stretch"
              justifyContent="stretch">
              <Box className={classes.adjust} display="flex" alignItems="center" justifyContent="center">
                <CircularProgress/>
              </Box>
              <Box flex={1} display="flex" flexDirection="column" justifyContent="center">
                <Typography variant="h6">
                  Loading
                </Typography>
                <Typography variant="subtitle2">
                  Current: {drop.current} Total: {drop.total}
                </Typography>
              </Box>
            </Box>
          </Dialog>
        );
      } else {
        return (
          <Fragment/>
        );
      }

    };

  } // namespace components

} // namespace mark
