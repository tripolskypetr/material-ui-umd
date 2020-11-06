
/// <reference path="../components/Group.tsx"/>

namespace form {

  const {
    Typography,
    Box,
    makeStyles,
  } = material.core;

  const {
    Group,
  } = components;

  export namespace fields {

    const useStyles = makeStyles((theme) => ({
      root: {
        height: 56,
        display: 'flex',
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
        alignItems: 'center',
        justifyContent: 'stretch',
      },
      line: {
        background: theme.palette.text.secondary,
        flexGrow: 1,
        margin: 15,
        height: 1,
      }
    }));

    export const LineField = ({
      className = '',
      columns = '',
      title = '',
      phoneColumns = '',
      tabletColumns = '',
      desktopColumns = '',
    }) => {

      const classes = useStyles();

      const groupProps = {
        columns,
        phoneColumns,
        tabletColumns,
        desktopColumns,
      };

      return (
        <Group {...groupProps} className={classNames(className, classes.root)}>
          <Typography variant="h5">{title}</Typography>
          <Box className={classes.line}></Box>
        </Group>
      );
    };

  } // namespace fields

} // namespace form
