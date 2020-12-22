namespace mobxApp {

  const {
    Fragment,
  } = React;

  const {
    useState,
  } = React;

  const {
    One,
    FieldType,
  } = form;

  const {
    Button,
  } = material.core;

  const {
    useRouter,
  } = router;

  export namespace pages {

    const fields: form.IField[] = [
      {
        type: FieldType.Line,
        title: 'Авторизация',
      },
      {
        type: FieldType.Text,
        name: 'login',
        title: 'Логин',
        description: 'tripolskypetr'
      },
      {
        type: FieldType.Text,
        name: 'password',
        title: 'Пароль',
        description: '12345',
        inputType: 'password',
      },
    ];

    export const LoginPage = () => {
      const go = useRouter();
      const [data, setData] = useState({
        login: 'tripolskypetr',
        password: '12345',
      });
      const handleClick = () => go('/home');
      return (
        <Fragment>
          <One handler={data} fields={fields}
            change={(d) => setData(d)} />
          <Button onClick={handleClick}>
            Войти
          </Button>
        </Fragment>
      );
    };

  } // namespace pages

} // namespace mobxApp
