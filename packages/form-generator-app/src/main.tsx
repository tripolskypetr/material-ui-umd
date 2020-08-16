
/// <reference path="./components/index.ts"/>
/// <reference path="./pages/index.ts"/>

namespace app {

  const {
    MuiThemeProvider,
    createMuiTheme,
    CssBaseline,
    Container,
  } = material.core;

  const {
    Scaffold,
  } = components;

  const {
    BriefPage,
    ListPage,
    OnePage,
  } = pages;

  const {
    Router,
    Route
  } = router;

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#f48fb1',
      },
      secondary: {
        main: '#90cbf9',
      },
      text: {
        primary: "#fff",
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
        hint: "rgba(255, 255, 255, 0.5)",
        icon: "rgba(255, 255, 255, 0.5)"
      },
      background: {
        paper: "#424242",
        default: "#212121",
        level2: "#333333",
        level1: "#212121"
      },
    },
  });

  const App = () => {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Scaffold>
          <Container>
            <Router>
              <Route url="/" component={BriefPage}/>
              <Route url="/list" component={ListPage}/>
              <Route url="/one/:id" component={OnePage}/>
            </Router>
          </Container>
        </Scaffold>
      </MuiThemeProvider>
    );
  }

  export const main = () =>
    ReactDOM.render(<App/>, document.querySelector('#mount-point'));

} // namespace app
