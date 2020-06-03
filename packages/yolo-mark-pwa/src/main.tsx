
/// <reference path="./pages/index.ts"/>

namespace mark {

  const {
    Scaffold,
  } = components;

  const {
    App
  } = pages;

  const {
    MuiThemeProvider,
    createMuiTheme,
    CssBaseline,
  } = material.core;

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

  const Entry = () => (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <Scaffold>
        <App/>
      </Scaffold>
    </MuiThemeProvider>
  );

  export const main = () => ReactDOM.render(<Entry/>, document.querySelector('#mount-point'));

} // namespace mark
