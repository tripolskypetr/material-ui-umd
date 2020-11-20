namespace form {

  const {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    makeStyles,
    CssBaseline,
  } = material.core;

  const {
    Drawer,
    ListItem,
    Container,
    ListItemText,
    ListItemIcon,
    List: MatList,
  } = material.core;

  const {
    GitHub,
    Menu,
  } = material.icons;

  const {
    createElement: h,
    Fragment,
  } = React;

  const {
    createIcon,
  } = utils;

  const {
    useState,
  } = React;

  const {
    withType,
  } = hooks;

  export namespace components {

    const openBlank = () => {
      const a = document.createElement('a');
      a.href = 'https://github.com/tripolskypetr/material-ui-umd/tree/master/packages/form-generator-app';
      a.target = '_blank';
      a.click();
    };

    const useStyles = makeStyles((theme) => ({
      title: {
        flexGrow: 1,
      },
      appBar: {
        background: theme.palette.background.level2,
        color: theme.palette.text.primary,
      },
      offset: theme.mixins.toolbar,
      adjust: {
        padding: 10,
      },
      hide: {
        display: 'none',
      },
    }));

    namespace internal {

      const RightCornerDefault = () => (
        <IconButton color="inherit" onClick={openBlank}>
          <GitHub />
        </IconButton>
      );

      export const Scaffold = ({
        showMenu = true,
        children = null,
        className = '',
        title = 'Application Title',
        RightCorner,
        pages = [],
        style = {},
      }) => {
        const classes = useStyles();
        const [opened, setOpened] = useState(false);
        return (
          <Fragment>
            <CssBaseline />
            <Drawer open={opened} onClose={() => setOpened(false)}>
              <MatList style={{minWidth: "240px"}}>
                {pages.map(({icon, title, click}, index) => (
                  <ListItem button onClick={() => {
                    if (click) {
                      click();
                    }
                    setOpened(false);
                  }} key={index}>
                    {icon && h(ListItemIcon, null, createIcon(icon))}
                    <ListItemText primary={title} />
                  </ListItem>
                ))}
              </MatList>
            </Drawer>
            <AppBar className={classNames(classes.appBar, className)}
              position="fixed" style={style} >
              <Toolbar>
                <IconButton className={classNames({
                  [classes.hide]: !showMenu
                })} onClick={() => setOpened(true)} color="inherit">
                  <Menu />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {title}
                </Typography>
                {(RightCorner && h(RightCorner)) || (RightCorner !== null && h(RightCornerDefault))}
              </Toolbar>
            </AppBar>
            <div className={classes.offset}/>
            <div className={classes.adjust}>
              <Container>
                {children}
              </Container>
            </div>
          </Fragment>
        );
      };

      export type ScaffoldProps = Parameters<typeof Scaffold>[0];

    } // namespace internal

    export interface IScaffoldProps extends Omit<internal.ScaffoldProps, 'RightCorner'> {
      /**
       * Регулирует доступность бокового меню
       */
      showMenu?: boolean;
      /**
       * Внутри Scaffold следует размещать приложение
       */
      children?: material.Element;
      /**
       * Наименования классов, которые будет переданы в AppBar
       */
      className?: string;
      /**
       * Стили, которые будут переданы в AppBar
       */
      styles?: React.CSSProperties;
      /**
       * Содержимое бокового меню. Состоит из массива объектов
       * следующей структуры
       */
      pages?: {
        icon: material.Component | string;
        click: CallableFunction;
        title: string;
      }[];
      /**
       * Компонент иконки в правом углу можно переопределить
       */
      RightCorner?: material.Component | null;
      /**
       * Заголовок приложения
       */
      title?: string;
    };

    export const Scaffold = withType<IScaffoldProps>(internal.Scaffold);

  } // namespace components

} // namespace app
