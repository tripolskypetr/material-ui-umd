
/// <reference path="./services/index.ts"/>
/// <reference path="./hoc/index.ts"/>
/// <reference path="./pages/index.ts"/>

namespace mobxApp {

  const {
    Route,
    Router,
  } = router;

  const {
    Scaffold,
  } = form;

  const {
    createMuiTheme,
    MuiThemeProvider,
  } = material.core;

  const {
    HomePage,
    LoginPage,
  } = pages;

  const THEME_LIGHT = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#1976d2',
      },
      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.54)",
        disabled: "rgba(0, 0, 0, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)",
      },
      background: {
        default: "#fff",
        level1: "#fff",
        level2: "#1976d2",
        paper: "#f5f5f5",
      },
    }
  });

  const App = () => (
    <MuiThemeProvider theme={THEME_LIGHT}>
      <Scaffold title="Boilerplate" showMenu={false}>
        <Router initialtUrl="/login">
          <Route url="/login" component={LoginPage} />
          <Route url="/home" component={HomePage} />
        </Router>
      </Scaffold>
    </MuiThemeProvider>
  );

  export const main = () => ReactDOM.render(<App/>, document.querySelector('#mount-point'));

} // namespace mobxApp
