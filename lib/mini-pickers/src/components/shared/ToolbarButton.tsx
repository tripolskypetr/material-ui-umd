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
        color: theme.palette.common.lightWhite,
      },
      toolbarBtnSelected: {
        color: theme.palette.common.white,
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
