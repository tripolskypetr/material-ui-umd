namespace mark {

  const {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
  } = material.core;

  const {
    GitHub,
  } = material.icons;

  const {
    makeStyles
  } = material.styles;

  const {
    Slide,
    useScrollTrigger
  } = material.core;

  const {
    Fragment
  } = React;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      background: theme.palette.background.level2,
      color: theme.palette.text.primary,
      width: 'calc(100vw - 240px)',
      left: 240,
    },
    offset: theme.mixins.toolbar,
  }));

  export namespace components {

    const HideOnScroll = ({
      children = null,
    }) => {
      const trigger = useScrollTrigger({ target: window });
      return (
        <Slide appear={false} direction="down" in={!trigger}>
          {children}
        </Slide>
      );
    }

    export const Scaffold = ({
      children = null,
    }) => {
      const classes = useStyles();

      const openBlank = () => {
        const a = document.createElement('a');
        a.href = 'https://github.com/tripolskypetr/material-ui-umd';
        a.target = '_blank';
        a.click();
      };

      return (
        <Fragment>
          <HideOnScroll>
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  Yolo markup tool
                    </Typography>
                <IconButton color="inherit" onClick={openBlank}>
                  <GitHub />
                </IconButton>
              </Toolbar>
            </AppBar>
          </HideOnScroll>
          <div className={classes.offset}/>
          {children}
        </Fragment>
      );
    }

  } // namespace components

} // namespace mark
