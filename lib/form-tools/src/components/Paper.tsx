
/// <reference path="./Group.tsx"/>

namespace form {

  const {
    Paper: MatPaper,
    makeStyles,
  } = material.core;

  const useStyles = makeStyles({
    strech: {
      position: 'relative',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'stretch',
    },
    content: {
      flexGrow: 1,
      width: '100%',
    },
  });

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
          <MatPaper className={classes.content}>
            <Group>
              {children}
            </Group>
          </MatPaper>
        </Group>
      );
    };

  } // namespace components

} // namespace form
