namespace documentation {

  const {
    MuiThemeProvider,
    Drawer,
    MenuItem,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    createMuiTheme,
  } = material.core;

  const {
    makeStyles
  } = material.styles;

  const {
    ThemeProvider,
  } = material.core;

  const {
    Menu
  } = material.icons;

  const {
    purple,
    green,
  } = material.core.colors

  const {
    Provider
  } = ReactRedux;

  const useStyles = makeStyles((theme) => {
    console.log({theme})
    return ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })});

  const theme = createMuiTheme({
    palette: {
      primary: purple,
      secondary: green,
    },
    status: {
      danger: 'orange',
    },
  })

  console.log({theme})

  const App = () => {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Drawer docked={false}>
            <MenuItem>Menu item</MenuItem>
          </Drawer>
          <AppBar>
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <Menu />
              </IconButton>
              <Typography variant="h6">
                News
                </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </Provider>
    );
  };

  export const main = () => ReactDOM.render(<App />, document.querySelector('#mount-point'));
}
