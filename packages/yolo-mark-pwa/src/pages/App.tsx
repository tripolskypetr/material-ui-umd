
/// <reference path="../components/index.ts"/>
/// <reference path="../utils/index.ts"/>

namespace mark {

  const {
    openImage,
  } = utils;

  const {
    Files,
    Editor,
  } = components;

  const {
    Drawer,
    Typography,
  } = material.core;

  const {
    Fragment
  } = React;

  const {
    makeStyles
  } = material.styles;

  const {
    useState
  } = React;

  export namespace pages {

    const useStyles = makeStyles((theme) => ({
      drawer: {
        minWidth: 240,
      },
      adjust: {
        marginLeft: 240
      },
      openFile: {
        padding: 25,
      }
    }));

    export const App = () => {

      const classes = useStyles();

      const [state, setState] = useState<IState>({
        cordsList: new Map(),
        current: -1,
        files: [],
      });

      const onSave = (cords) => console.log({cords});

      const onAddImage = async () => {
        const file: IFile = await openImage();
        setState(({files, cordsList}) => ({files: [...files, file], current: files.length, cordsList}));
      };

      const onRemoveImage = (url) => setState(({files, cordsList}) => ({
        files: files.filter((f) => f.url !== url),
        current: files.length === 1 ? -1 : files.length - 1,
        cordsList
      }));

      const onSelectImage = (url) => setState(({files, cordsList}) => ({
        files, current: files.findIndex((f) => f.url === url), cordsList
      }));

      return (
        <Fragment>
          <Drawer variant="permanent" open={true} className={classes.drawer}>
            <Files
              onAdd={onAddImage}
              files={state.files}
              onRemove={onRemoveImage}
              onSelect={onSelectImage}/>
          </Drawer>
          <div className={classes.adjust}>
            {state.current === -1 && <Typography className={classes.openFile} variant="h4">Please open file to continue</Typography>}
            {state.current !== -1 && <Editor onSave={onSave}/>}
          </div>
        </Fragment>
      );
    };

  } // namespace components

} // namespace mark
