namespace reduxApp {

  const {
    Typography,
    Button,
  } = material.core;

  const {
    makeStyles,
  } = material.styles;

  const {
    Fragment,
    useState,
  } = React;

  export namespace pages {

    const useStyles = makeStyles((theme) => ({
      center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      column: {
        flexDirection: 'column'
      },
      adjust: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
      },
      button: {
        margin: theme.spacing(2),
        minWidth: '125px'
      }
    }));

    const Center = ({
      children = null,
      ...otherProps
    }) => (
      <div {...otherProps}>
        {children}
      </div>
    );

    const Lorem = () => (
      <Fragment>
        <Typography variant="body1">
          Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной
          "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию
          размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без
          заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили
          публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной
          вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
        </Typography>
        <br/>
      </Fragment>
    );

    export const BriefingPage = () => {
      const classes = useStyles();
      const [value, setValue] = useState(0);
      return (
        <Fragment>
          <Typography className={classes.adjust} variant="h4">
            Boilerplate
          </Typography>
          <Typography variant="body1">
            Приложение-шаблон для быстрого старта других проектов. Просто скопируйте его содержимое
            и переименуйте пространство имен "boilerplate" исходя из ваших нужд.
          </Typography>

          <Center className={classNames(classes.center, classes.column)}>
            <Typography variant="h1">
              {value}
            </Typography>
            <Center className={classes.center}>
              <Button onClick={() => setValue(value - 1)} className={classes.button} variant="contained" color="primary">
                Отнять
              </Button>
              <Button onClick={() => setValue(value + 1)} className={classes.button} variant="contained" color="secondary">
                Добавить
              </Button>
            </Center>
          </Center>

          {[...new Array(10)].reduce((acm) => [...acm, acm.length], []).map((v) => <Lorem key={v}/>)}

        </Fragment>
      );
    }

  } // namespace pages

} // namespace reduxApp
