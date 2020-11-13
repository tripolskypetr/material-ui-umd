namespace other {

  const {
    SnackbarContent,
    IconButton,
    Snackbar,
    Button,
    makeStyles,
  } = material.core;

  const {
    Slide,
    Grow,
  } = material.core;

  const {
    Close,
  } = material.icons;

  const {
    Alert,
  } = material.lab;

  const {
    useState,
  } = React;

  export namespace components {

    const useStyles = makeStyles({
      closeButton: {
        color: '#808080a1',
      },
    });

    const SnackAction = ({action, actionMode, onAction, onClose}) => {
      const classes = useStyles();
      if (actionMode === ActionMode.Button) {
        return (
          <Button onClick={onAction} color="secondary" size="small">
            {action}
          </Button>
        );
      } else if (actionMode === ActionMode.Close) {
        return (
          <IconButton onClick={onClose} className={classes.closeButton}>
            <Close/>
          </IconButton>
        );
      } else {
        return null;
      }
    };

    const createTransition = (type: snack.TransitionType, direction: snack.TransitionDirection) => {
      if (type === snack.TransitionType.Grow) {
        return (props) => <Grow {...props} />;
      } else if (type === snack.TransitionType.Slide) {
        return (props) => <Slide {...props} direction={direction} />;
      } else {
        return null;
      }
    };

    type func = CallableFunction;

    enum ActionMode {
      Button = 'button',
      Close = 'close',
      None = 'none',
    }

    interface IExtendedSnack extends snack.ISnack {
      anchorOrigin: {
        horizontal: snack.HorizontalAlign,
        vertical: snack.VerticalAlign,
      },
      actionMode?: ActionMode,
    };

    const defaultProps = (s: snack.ISnack, onClose: func): IExtendedSnack => ({
      anchorOrigin: {
        vertical: s.anchorVertical || snack.VerticalAlign.Bottom,
        horizontal: s.anchorHorizontal || snack.HorizontalAlign.Center,
      },
      message: s.message || 'Message unset',
      action: s.action,
      transition: s.transition || snack.TransitionType.Grow,
      type: s.type || snack.SnackType.Normal,
      timeout: s.timeout || 5000,
      transitionDirection: s.transitionDirection || snack.TransitionDirection.Up,
      actionMode: (s.action && ActionMode.Button)
        || (s.message && s.message.length > 25 && ActionMode.None)
        || ActionMode.Close,
      onClose() {
        if (s.onClose) { setTimeout(() => s.onClose()); }
        onClose();
      },
      onAction() {
        if (s.onAction) { setTimeout(() => s.onAction()); }
        if (s.onClose) { setTimeout(() => s.onClose()); }
        onClose();
      }
    });

    export const SnackViewer = (props: snack.ISnack) => {
      const [open, setOpen] = useState(true);
      const {
        transition: tr, transitionDirection,
        anchorOrigin, onClose, onAction,
        timeout, message, type, action,
        actionMode,
      } = defaultProps(props, () => setOpen(false));
      const renderContent = () => {
        if (type === snack.SnackType.Normal) {
          return (
            <SnackbarContent message={message}
              action={
                <SnackAction
                  actionMode={actionMode}
                  onAction={onAction}
                  onClose={onClose}
                  action={action} />
              }
              onClose={onClose} />
          );
        } else {
          return (
            <Alert onClose={onClose} severity={type}>
              {message}
            </Alert>
          );
        }
      };
      return (
        <Snackbar anchorOrigin={anchorOrigin} autoHideDuration={timeout}
          message={message} onClose={onClose} open={open}
          TransitionComponent={createTransition(tr, transitionDirection)}>
          { renderContent() }
        </Snackbar>
      )
    };

  } // namespace components

} // namespace scene
