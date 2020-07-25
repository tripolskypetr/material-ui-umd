namespace app {

  const {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    makeStyles,
  } = material.core;

  const {
    GitHub
  } = material.icons;

  const {
    Fragment
  } = React;

  export namespace components {

    const openBlank = () => {
      const a = document.createElement('a');
      a.href = 'https://github.com/tripolskypetr/material-ui-umd/tree/master/packages/form-generator-app';
      a.target = '_blank';
      a.click();
    };

    const useStyles = makeStyles((theme) => ({
      title: {
        flexGrow: 1,
      },
      appBar: {
        background: theme.palette.background.level2,
        color: theme.palette.text.primary,
      },
      offset: theme.mixins.toolbar,
      adjust: {
        padding: 10,
      },
    }));

    export const Scaffold = ({
      children = null,
      className = '',
      ...otherProps
    }) => {
      const classes = useStyles();
      return (
        <Fragment>
          <AppBar position="fixed" className={classNames(classes.appBar, className)} {...otherProps}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                JSON form sample
              </Typography>
              <IconButton color="inherit" onClick={openBlank}>
                <GitHub />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.offset}/>
          <div className={classes.adjust}>
            {children}
          </div>
        </Fragment>
      );
    };

  } // namespace components

} // namespace app
