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
    ArrowDropUp,
    ArrowDropDown,
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
      },
      maxWidth: {
        maxWidth: '120px',
        overflow: 'hidden',
      },
      focused: {
        background: '#ffffff1a',
      },
    }));

    export const Files = ({
      files = [
        {name: 'file.png', date: 'Jan 9, 2014', url: 'unset', color: '#424242'}
      ],
      current = '',
      onSelect = (select) => console.log({ select }),
      onRemove = (remove) => console.log({ remove }),
      onGo = (go) => console.log({go}),
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
            <IconButton size="small" onClick={() => onGo(-1)}>
              <ArrowDropUp />
            </IconButton>
            <IconButton size="small" onClick={() => onGo(1)}>
              <ArrowDropDown />
            </IconButton>
            <IconButton size="small" onClick={onAdd}>
              <Add />
            </IconButton>
          </Box>
          {files.map(({name, date, url, color}, index) => (
            <ListItem className={classNames({[classes.focused]: url === current})} onClick={() => onSelect(url)} button key={index}>
              <ListItemAvatar>
                <Avatar>
                  <Image style={{color}} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText className={classes.maxWidth} primary={name} secondary={date} />
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
