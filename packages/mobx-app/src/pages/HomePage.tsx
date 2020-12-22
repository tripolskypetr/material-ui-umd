namespace mobxApp {

  const {
    Button,
    Box,
    Fab,
    List,
    ListItem,
    IconButton,
    ListItemText,
    ListItemSecondaryAction,
  } = material.core;

  const {
    Add,
    Delete,
  } = material.icons;

  const {
    Fragment,
  } = React;

  const {
    makeStyles,
  } = material.core;

  const {
    withItemService,
  } = hoc;

  const {
    useRouter,
  } = router;

  const {
    usePrompt,
  } = pickers;

  export namespace pages {

    const useStyles = makeStyles((theme) => ({
      header: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'stretch',
        '& $counter': {
          flex: 1,
        },
      },
      counter: {
        display: 'flex',
        alignItems: 'stretch',
        '& > *': {
          margin: '5px',
        },
        '& > p': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
      },
    }));

    namespace internal {

      interface IHomePageProps {
        itemService: services.ItemService,
      }

      export const HomePage = ({
        itemService,
      }: IHomePageProps) => {
        const classes = useStyles();
        const prompt = usePrompt();
        const go = useRouter();
        const handleRevoke = () => go('/login');
        const handleAdd = () => {
          itemService.addToCart({
            title: 'Наименование',
            price: 500,
          });
        };
        const handleDelete = (itemId) => () => {
          itemService.removeFromCart(itemId);
        };
        const handleRename = (itemId) => () => {
          prompt('Поменять заголовок', 'Новый заголовок').then((v) => {
            if (v) {
              itemService.changeTitle(itemId, v);
            }
          })
        };
        return (
          <Fragment>
            <Box className={classes.header}>
              <Box className={classes.counter}>
                <p>{itemService.count}</p>
                <Button onClick={itemService.inc}>+</Button>
                <Button onClick={itemService.dec}>-</Button>
              </Box>
              <Button onClick={handleRevoke}>
                Отозвать токен
              </Button>
            </Box>
            <List className={classes.container}>
              {
                itemService.cartList.map(({id, title}) => (
                  <ListItem button key={id}>
                    <ListItemText onClick={handleRename(id)} primary={title} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={handleDelete(id)} edge="end">
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
            </List>
            <Fab onClick={handleAdd} color="primary" className={classes.fab}>
              <Add/>
            </Fab>
          </Fragment>
        );
      };

    } // namespace internal

    export const HomePage = withItemService(internal.HomePage);

  } // namespace pages

} // namespace mobxApp
