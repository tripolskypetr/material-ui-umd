namespace documentation {

  const {
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
  } = material.core;

  const {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Icon,
    Container,
  } = material.core;

  const {
    Menu,
    GitHub,
  } = material.icons;

  const {
    Fragment,
    useState,
  } = React;

  const {
    makeStyles
  } = material.styles;

  const {
    Slide,
    useScrollTrigger
  } = material.core;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    list: {
      width: 240,
    },
    appBar: {
      background: theme.palette.background.level2,
      color: theme.palette.text.primary,
    },
    offset: theme.mixins.toolbar,
  }));

  export namespace components {

    namespace internal {

      const HideOnScroll = ({
        children = null,
      }) => {
        const trigger = useScrollTrigger({ target: window });
        return (
          <Slide appear={false} direction="down" in={!trigger}>
            {children}
          </Slide>
        );
      }

      const Navigation = ({
        setOpened = (v) => console.log({v}),
        classes = null,
        pages,
      }) => (
          <div
            className={classes.list}
            role="presentation"
            onClick={() => setOpened(false)}
            onKeyDown={() => setOpened(false)}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  <Icon>star</Icon>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      );

      export const Scaffold = ({
        children = null,
        pages
      }) => {
        const classes = useStyles();
        const [opened, setOpened] = useState(false);

        const openBlank = () => {
          const a = document.createElement('a');
          a.href = 'https://github.com/tripolskypetr/material-ui-umd';
          a.target = '_blank';
          a.click();
        };

        return (
          <Fragment>
            <Drawer open={opened} onClose={() => setOpened(false)}>
              <Navigation pages={pages} setOpened={(v) => setOpened(v)} classes={classes}/>
            </Drawer>
            <HideOnScroll>
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton onClick={() => setOpened(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <Menu />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Документация
                  </Typography>
                  <IconButton color="inherit" onClick={openBlank}>
                    <GitHub />
                  </IconButton>
                </Toolbar>
              </AppBar>
            </HideOnScroll>
            <div className={classes.offset} />
            <Container>
              {children}
            </Container>
          </Fragment>
        );
      }

      export type ScaffoldProps = Parameters<typeof Scaffold>[0];

    } // namespace internal

    interface ScaffoldProps extends internal.ScaffoldProps {
      pages: {title: string, icon: string, payload: string}[];
    }

    export const Scaffold = internal.Scaffold;

  } // namespace components

} // namespace documentation
