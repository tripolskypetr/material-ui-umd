namespace pickers {

  const {
    Dialog,
    Button,
    DialogContent,
    DialogActions,
  } = material.core;

  const {
    makeStyles,
  } = material.core;

  export namespace components {

    const useStyles = makeStyles({
      dialog: {
        '&:first-child': {
          padding: 0,
        },
      },
    });

    export const ModalDialog = ({
      children = null,
      onAccept = () => console.log('accept'),
      onDismiss = () => console.log('dismiss'),
      ...other
    }) => {
      const classes = useStyles();
      return (
        <Dialog {...other}>
          <DialogContent className={classes.dialog}>
            { children }
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={onAccept}> OK </Button>
            <Button color="primary" onClick={onDismiss}> Cancel </Button>
          </DialogActions>
        </Dialog>
      );
    };

  } // namespace components

} // namespace pickers
