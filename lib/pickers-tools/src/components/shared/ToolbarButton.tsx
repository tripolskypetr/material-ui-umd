namespace pickers {

  const {
    Typography,
  } = material.core;

  const {
    makeStyles,
  } = material.core;

  export namespace components {

    const useStyles = makeStyles((theme) => ({
      toolbarBtn: {
        cursor: 'pointer',
        color: theme.palette.text.secondary,
      },
      toolbarBtnSelected: {
        color: theme.palette.text.primary,
      },
    }));

    export const ToolbarButton = ({
      selected = false,
      className = '',
      label = '',
      ...other
    }) => {
      const classes = useStyles();
      return (
        <Typography
          className={classNames(classes.toolbarBtn, className, {
            [classes.toolbarBtnSelected]: selected,
          })}
          {...other}
        >
          { label }
        </Typography>
      );
    };

  } // namespace components

} // namespace pickers
