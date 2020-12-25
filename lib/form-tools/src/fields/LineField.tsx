
/// <reference path="../components/Group.tsx"/>

namespace form {

  const {
    Typography,
    Box,
    makeStyles,
  } = material.core;

  const {
    makeManaged,
  } = components;

  export namespace fields {

    const useStyles = makeStyles((theme) => ({
      root: {
        height: 72,
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

    export interface ILineFieldProps {
      title: PickProp<IManaged, 'title'>;
    }

    export const LineField = makeManaged(({
      title = '',
    }: ILineFieldProps) => {
      const classes = useStyles();
      return (
        <Box className={classes.root}>
          <Typography variant="h5">{title}</Typography>
          <Box className={classes.line}></Box>
        </Box>
      );
    });

  } // namespace fields

} // namespace form
