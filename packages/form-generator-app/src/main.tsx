
/// <reference path="./components/index.ts"/>
/// <reference path="./pages/index.ts"/>

namespace app {

  const {
    MuiThemeProvider,
    createMuiTheme,
  } = material.core;

  const {
    Scaffold,
  } = components;

  const {
    PickerPage,
    ChartPage,
    BriefPage,
    SnackPage,
    ListPage,
    OnePage,
  } = pages;

  const {
    SnackProvider,
  } = other.snack;

  const {
    Router,
    Route,
  } = router;

  const {
    LooksOne,
    LooksTwo,
    Looks3,
    Looks4,
  } = material.icons;

  const {
    useRef,
  } = React;

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
    const router = useRef(null);
    const pages = [
      {icon: LooksOne, title: "Документ со Справочником", click() { router.current("/list") } },
      {icon: LooksTwo, title: "Использование other-tools", click() { router.current("/snack") } },
      {icon: Looks3, title: "Использование pickers-tools", click() { router.current("/picker") } },
      {icon: Looks4, title: "Использование chart-tools", click() { router.current("/chart") } },
    ];
    return (
      <MuiThemeProvider theme={theme}>
        <SnackProvider>
          <Scaffold title="Form generator app" pages={pages}>
            <Router ref={router}>
              <Route url="/" component={BriefPage}/>
              <Route url="/list" component={ListPage}/>
              <Route url="/one/:id" component={OnePage}/>
              <Route url="/snack" component={SnackPage}/>
              <Route url="/picker" component={PickerPage}/>
              <Route url="/chart" component={ChartPage}/>
            </Router>
          </Scaffold>
        </SnackProvider>
      </MuiThemeProvider>
    );
  }

  export const main = () =>
    ReactDOM.render(<App/>, document.querySelector('#mount-point'));

} // namespace app
