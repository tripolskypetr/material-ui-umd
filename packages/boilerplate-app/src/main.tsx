
/// <reference path="./components/index.ts"/>
/// <reference path="./store.ts"/>

namespace boilerplate {

  const {
    MuiThemeProvider,
    createMuiTheme,
    CssBaseline,
  } = material.core;

  const {
    Provider
  } = ReactRedux;

  const {
    blue,
    pink,
    red
  } = material.core.colors;

  const {
    Scaffold,
    Router
  } = components;

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

  const pages = [
    {title: 'Главная', icon: 'home', payload: 'briefing'},
    {title: 'Компоненты', icon: 'insert_emoticon', payload: 'components'},
  ];

  const App = () => {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline/>
          <Scaffold pages={pages}>
            <Router/>
          </Scaffold>
        </MuiThemeProvider>
      </Provider>
    );
  };

  export const main = () => ReactDOM.render(<App/>, document.querySelector('#mount-point'));

} // namespace boilerplate
