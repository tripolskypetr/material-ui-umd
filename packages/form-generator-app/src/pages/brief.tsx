namespace app {

  const {
    Fragment
  } = React;

  const {
    Typography,
    Container,
    makeStyles,
  } = material.core;

  const {
    useRouter,
    Link
  } = router;

  export namespace pages {

    const useStyles = makeStyles((theme) => ({
      adjust: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
      line: {
        marginBottom: theme.spacing(2),
      },
    }));

    const b = ({children = null}) => <>&lt;{children}&gt;</>;

    export const Brief = () => {
      const go = useRouter();
      const classes = useStyles();
      return (
        <Container>
          <Typography className={classes.adjust} variant="h4">
            Form generator app
          </Typography>
          <Typography variant="body1" className={classes.line}>
            Это приложение позволяет ознакомиться с
            инструментами <em>virtual-router</em> и <em>jsonschema-form</em>.
            В качестве объекта изучения будет использоваться
            абстрактная база профилей
          </Typography>
          <Typography variant="body" className={classes.line}>
            Роутер использует поставщик контекста
          </Typography>
          <Typography variant="body">
            Переход между ссылками у роутера может осуществляться через
            компонент <Link url="/list" style={{color: 'blue'}}>ссылки</Link> или специальный
            хук <i style={{color: 'blue'}} onClick={() => go('/list')}>useRouter</i>
          </Typography>
        </Container>
      );
    };

  } // namespace pages

} // namespace app