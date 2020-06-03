
/// <reference path="../components/index.ts"/>

namespace mark {

  const {
    roi,
    rect,
    square,
  } = webcomponents;

  const {
    Files,
    Selector,
  } = components;

  const {
    Drawer,
  } = material.core;

  const {
    Fragment
  } = React;

  const {
    makeStyles
  } = material.styles;

  const uuid = () => Math.random().toString(36).substring(7);

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

  export namespace pages {

    export const App = () => {
      const classes = useStyles();

      const cords = [
        rect(uuid(), 10, 10, 100, 100)
      ];

      return (
        <Fragment>
          <Drawer variant="permanent" open={true} className={classes.drawer}>
            <Files/>
          </Drawer>
          <div className={classes.adjust}>
            <Selector cords={cords}/>
            <div className={classes.container}>
              <p>123</p>
            </div>
          </div>
        </Fragment>
      );
    };

  } // namespace components

} // namespace mark
