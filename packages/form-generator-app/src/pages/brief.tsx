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
          <Typography variant="body" className={classes.line} component="p">
            Роутер использует поставщик контекста <b>Router</b>, который необходимо установить в месте,
            где потребуется осуществлять роутинг. В обязательном порядке его потомками могут быть только
            компоненты <b>Route</b>, получающие в свойства шаблонную ссылку и целевой компонент. Параметры
            из ссылки будут переданы в свойства компонента при инстанцировании. Роутер пробрасывает в консоль
            разработчика текущую ссылку (<i>routerUrl</i>) и функцию для перехода по ссылке (<i>routerGo</i>)
          </Typography>
          <Typography variant="body" className={classes.line} component="p">
            Генератор форм использует json шаблоны для вывода документов (List) и справочников (One). Документ
            это список карточек профилей, справочник эта сама карточка профиля. Оба компонента выводят данные
            из обработчика (handler), подразумевается, что это промис с http запросом на сервер. Шаблон состоит
            из вложенных объектов, основными полями которых являются <i>type</i> - тип поля, <i>name</i> - путь до целевого поля
            объекта из handler в формате lodash get, <i>fields</i> - массив дочерних вложенных объектов, если текущий имеет
            тип группы. Поля для своего шаблона можно копипастить из этого примера.
          </Typography>
          <Typography variant="body" className={classes.line} component="p">
            Переход между ссылками у роутера может осуществляться через
            компонент <Link url="/list" style={{color: 'blue', cursor: 'pointer'}}>ссылки</Link> или специальный
            хук <a style={{color: 'blue', cursor: 'pointer'}} onClick={() => go('/list')}>useRouter</a>
          </Typography>
        </Container>
      );
    };

  } // namespace pages

} // namespace app