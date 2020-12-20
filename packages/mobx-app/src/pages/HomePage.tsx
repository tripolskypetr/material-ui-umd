namespace mobxApp {

  const {
    Typography,
    Button,
    Box,
  } = material.core;

  const {
    Fragment,
  } = React;

  const {
    useState,
  } = React;

  const {
    makeStyles,
  } = material.core;

  const {
    withAuthService,
  } = hoc;

  export namespace pages {

    const useStyles = makeStyles({
      root: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        '& $counter': {
          flex: 1,
        },
      },
      counter: {
        display: 'flex',
        alignItems: 'stretch',
        '& > *': {
          margin: '5px',
        },
        '& > p': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    });

    namespace internal {

      export const HomePage = ({
        authService,
      }) => {
        const classes = useStyles();
        return (
          <Fragment>
            <Box className={classes.root}>
              <Box className={classes.counter}>
                <p>{authService.count}</p>
                <Button onClick={authService.inc}>+</Button>
                <Button onClick={authService.dec}>-</Button>
              </Box>
              <Button>
                Отозвать токен
              </Button>
            </Box>
          </Fragment>
        );
      };

    } // namespace internal

    export const HomePage = withAuthService(internal.HomePage);

  } // namespace pages

} // namespace mobxApp
