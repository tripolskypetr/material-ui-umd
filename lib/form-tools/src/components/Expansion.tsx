
/// <reference path="./Group.tsx"/>

namespace form {

  const {
    Typography,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    makeStyles,
  } = material.core;

  const {
    ExpandMore,
  } = material.icons;

  const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
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
  }));

  export namespace components {

    export const Expansion = ({
      title = '',
      description = '',
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
          <ExpansionPanel className={classes.content}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography className={classes.heading}>{title}</Typography>
              <Typography className={classes.secondaryHeading}>{description}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Group>
                {children}
              </Group>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Group>
      );
    };

  } // namespace components

} // namespace form
