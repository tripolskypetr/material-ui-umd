namespace mark {

  const {
    Box,
    List,
    ListItem,
    IconButton,
    Typography,
    ListItemText,
  } = material.core;

  const {
    makeStyles
  } = material.styles;

  const {
    Add
  } = material.icons;

  const useStyles = makeStyles((theme) => ({
    header: {
      margin: theme.spacing(2),
    },
    list: {
      width: 240,
      maxHeight: '100vh',
      overflowY: 'scroll',
    }
  }));

  export namespace components {

    export const Files = ({
      files = ['first.png', 'second.png', 'third.png'],
      onSelect = (select) => console.log({select}),
    }) => {
      const classes = useStyles();
      return (
        <List className={classes.list}>
          <Box
            className={classes.header}
            display="flex"
            flexDirection="row"
            alignItems="stretch"
            justifyContent="stretch">
            <Box
              flex={1}
              display="flex"
              alignItems="center">
              <Typography variant="h6">
                Files
              </Typography>
            </Box>
            <IconButton>
              <Add/>
            </IconButton>
          </Box>
          {files.map((item, index) => (
            <ListItem onClick={() => onSelect(item)} button key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      );
    };

  } // namespace components

} // namespace mark
