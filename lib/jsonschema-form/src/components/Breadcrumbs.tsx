namespace form {

  const {
    Breadcrumbs: MatBreadcrumbs,
    Typography,
    Button,
    Link,
    Box,
  } = material.core;

  const {
    makeStyles,
  } = material.core;

  export namespace components {

    const useStyles = makeStyles({
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'stretch',
        flexDirection: 'row',
        paddingTop: '10px',
        paddingBottom: '10px',
      },
      stretch: {
        flexGrow: 1,
        shrink: 1,
      },
    });

    export const Breadcrumbs = ({
      back = () => console.log('back'),
      save = () => console.log('save'),
      currentTitle = 'Справочник',
      backwardTitle = 'Документ',
      saveDisabled = true,
      className = '',
      ...otherProps
    }) => {
      const classes = useStyles();
      return (
        <Box className={classNames(classes.root, className)} {...otherProps}>
          <MatBreadcrumbs className={classes.stretch} aria-label="breadcrumb">
            <Link color="inherit" onClick={back}>
              {backwardTitle}
            </Link>
            <Typography color="textPrimary">
              {currentTitle}
            </Typography>
          </MatBreadcrumbs>
          <Button onClick={save} color="primary" disabled={saveDisabled} variant="contained">
            Сохранить
          </Button>
        </Box>
      );
    };

  } // namespace components

} // namespace form
