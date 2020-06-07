
/// <reference path="../components/index.ts"/>
/// <reference path="../utils/index.ts"/>

namespace mark {

  const {
    openImage,
    saveMarkupFile,
    createExportCord,
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
    useState,
    useCallback,
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

    export const useForceUpdate = () => {
      const [, setTick] = useState(0);
      const update = useCallback(() => {
        setTick(tick => tick + 1);
      }, [])
      return update;
    };

    const withoutExtension = (v) => v.split('.')[0];

    export const App = () => {

      const classes = useStyles();

      const [cordsList, setCordsList] = useState<Map<string, ICord[]>>(new Map());
      const [currentFile, setCurrentFile] = useState<IFile>(null);
      const [files, setFiles] = useState<IFile[]>([]);

      const getInitialCords = (file: IFile) => {
        const {url} = file;
        if (cordsList && cordsList.has(url)) {
          return cordsList.get(url);
        } else {
          return [];
        }
      };

      const onSave = (url, cords) => {
        const file = files.find((f) => f.url === url);
        const { name, naturalHeight, naturalWidth } = file;
        saveMarkupFile(cords.map(({name, top, left, height, width}) =>
          createExportCord({
            bottom: (naturalHeight - top) - height,
            right: (naturalWidth - left) - width,
            height: naturalHeight,
            width: naturalWidth,
            name, top, left,
          })
        ).join("\n"), withoutExtension(name) + '.txt');
      };

      const onAddImage = async () => {
        const file: IFile = await openImage();
        setFiles((files) => [...files, file]);
        setCurrentFile(file);
      };

      const onRemoveImage = (url) => {
        setCurrentFile(files.length > 1 ? files[0] : null);
        setFiles((files) => files.filter((f) => f.url !== url));
      }

      const onSelectImage = (url) => 
        setCurrentFile(files.find((f) => f.url === url));

      const onEditorChange = (url, cords) => setCordsList((cordsList) => {
        cordsList.set(url, cords);
        return cordsList;
      });

      const render = () => {
        if (currentFile) {
          return (
            <Editor
              src={currentFile.url}
              initialCords={getInitialCords(currentFile)}
              onSave={(cords) => onSave(currentFile.url, cords)}
              onChange={(c) => onEditorChange(currentFile.url, c)}/>
          );
        } else {
          return (
            <Typography
              className={classes.openFile}
              variant="h4">
                Please open file to continue
              </Typography>
          );
        }
      };

      return (
        <Fragment>
          <Drawer variant="permanent" open={true} className={classes.drawer}>
            <Files
              onAdd={onAddImage}
              files={files}
              onRemove={onRemoveImage}
              onSelect={onSelectImage}/>
          </Drawer>
          <div className={classes.adjust}>
            {render()}
          </div>
        </Fragment>
      );
    };

  } // namespace components

} // namespace mark
