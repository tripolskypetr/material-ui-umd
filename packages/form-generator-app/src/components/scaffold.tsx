namespace app {

  const {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    makeStyles,
  } = material.core;

  const {
    List,
    Drawer,
    ListItem,
    ListItemText,
    ListItemIcon,
  } = material.core;

  const {
    GitHub,
    Menu,
  } = material.icons;

  const {
    Fragment,
    createElement: h,
  } = React;

  const {
    useState,
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
      pages = [],
      go = (url) => console.log({url}),
      ...otherProps
    }) => {
      const classes = useStyles();
      const [opened, setOpened] = useState(false);
      const onGo = (url) => {
        setOpened(false);
        go(url);
      };
      return (
        <Fragment>
          <Drawer open={opened} onClose={() => setOpened(false)}>
            <List style={{minWidth: "240px"}}>
              {pages.map(({icon = null, title, url}, index) => (
                <ListItem button onClick={() => onGo(url)} key={index}>
                  <ListItemIcon>
                    {icon && h(icon)}
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItem>
              ))}
            </List>
          </Drawer>
          <AppBar position="fixed" className={classNames(classes.appBar, className)} {...otherProps}>
            <Toolbar>
              <IconButton onClick={() => setOpened(true)} color="inherit">
                <Menu />
              </IconButton>
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
