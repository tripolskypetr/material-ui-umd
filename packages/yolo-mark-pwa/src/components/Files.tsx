namespace mark {

  const {
    Box,
    List,
    Avatar,
    ListItem,
    IconButton,
    Typography,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
  } = material.core;

  const {
    makeStyles
  } = material.styles;

  const {
    Add,
    Image,
    Clear,
  } = material.icons;

  export namespace components {

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

    export const Files = ({
      files = [
        {name: 'file.png', date: 'Jan 9, 2014', url: 'unset'}
      ],
      onSelect = (select) => console.log({ select }),
      onRemove = (remove) => console.log({ remove }),
      onAdd = () => console.log('add'),
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
            <IconButton onClick={onAdd}>
              <Add />
            </IconButton>
          </Box>
          {files.map(({name, date, url}, index) => (
            <ListItem onClick={() => onSelect(url)} button key={index}>
              <ListItemAvatar>
                <Avatar>
                  <Image />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} secondary={date} />
              <ListItemSecondaryAction>
                <IconButton onClick={() => onRemove(url)} edge="end">
                  <Clear />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      );
    };

  } // namespace components

} // namespace mark
