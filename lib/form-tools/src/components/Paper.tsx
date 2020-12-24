
/// <reference path="./Group.tsx"/>

namespace form {

  const {
    Paper: MatPaper,
    makeStyles,
    Box,
  } = material.core;

  const {
    classNames,
  } = utils;

  const useStyles = makeStyles((theme) => ({
    strech: {
      position: 'relative',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'stretch',
    },
    content: {
      flexGrow: 1,
      width: '100%',
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      '& $content': {
        marginRight: 'initial',
        marginBottom: 'initial',
      },
    },
  }));

  export namespace components {

    export const Paper = ({
      className = '',
      columns = '',
      phoneColumns = '',
      tabletColumns = '',
      desktopColumns = '',
      children = null,
      ...otherProps
    }) => {
      const classes = useStyles();
      return (
        <Group className={classNames(className, classes.strech)} columns={columns}
          {...otherProps}
          phoneColumns={phoneColumns}
          tabletColumns={tabletColumns}
          desktopColumns={desktopColumns}>
          <MatPaper className={classNames(classes.content, classes.strech)}>
            <Box p={2} className={classes.content}>
              <Group>
                {children}
              </Group>
            </Box>
          </MatPaper>
        </Group>
      );
    };

  } // namespace components

} // namespace form
