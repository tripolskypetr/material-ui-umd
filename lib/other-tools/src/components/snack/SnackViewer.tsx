namespace other {

  const {
    SnackbarContent,
    Snackbar,
    Button,
  } = material.core;

  const {
    Slide,
    Grow,
  } = material.core;

  const {
    Alert,
  } = material.lab;

  const {
    useState,
  } = React;

  export namespace components {

    const SnackAction = ({action, onAction}) => (
      <Button onClick={onAction} color="secondary" size="small">
        {action}
      </Button>
    );

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

    interface IExtendedSnack extends snack.ISnack {
      anchorOrigin: {
        horizontal: snack.HorizontalAlign,
        vertical: snack.VerticalAlign,
      }
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
      } = defaultProps(props, () => setOpen(false));
      const renderContent = () => {
        if (type === snack.SnackType.Normal) {
          return (
            <SnackbarContent message={message}
              action={
                <SnackAction
                  onAction={onAction}
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
