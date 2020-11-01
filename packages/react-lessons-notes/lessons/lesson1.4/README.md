# Урок 4

> Компоненты-функции (с прошлого урока). Компоненты высшего порядка (hoc для логгирования props). Верстаем страницы Redux приложения.

Занятие следует начать с установки [VS Code](https://code.visualstudio.com), [NodeJS](https://nodejs.org), веб сервера (`npm install -g http-server`).

## Оператор `with() { }`

> Используя `document.querySelector` или `document.getElementById` мы можем устанавливать элементам `DOM` древа стили

```
<script>
/* Следующий код */
{
  const body = document.querySelector('body');
  body.style.backgroundColor = 'green';
  body.style.height = '100vh';
  body.style.margin = '0';
  body.style.padding = '0';
  body.style.border = '25px solid yellow';
}

/* Эквивалентен этому */
{
	const body = document.querySelector('body');
  with (body.style) {
    backgroundColor = 'green';
    height = '100vh';
    margin = '0';
    padding = '0';
    border = '25px solid yellow';
  }
}
</script>
```

## Условно, все скрипты на странице запускаются в `with (window) { ... }`

> Используя `window`, можно перебрасывать значения между скриптами. Объект `window` является инструментом, позволяющим объявить [синглтон](https://ru.wikipedia.org/wiki/Одиночка_(шаблон_проектирования))

```
<script>
  console.log(window.alert === alert) // true
</script>
<script>
  if (true) {
    const func = () => 'bar';
    window.foo = func;
  }
</script>
<script>
  console.log(foo()) // 'bar'
  console.log(func()) // Uncaught ReferenceError: func is not defined
</script>
```

## Как работает `Object.assign()`

> Object.assign позволяет создавать копии объектов, а так же сливать множества входных параметров.

```
(function() {

  const obj1 = {a:1};
  const obj2 = {b:2};
  const obj3 = {c:3};

  const obj4 = {a:'a'};

  console.log(Object.assign({}, obj1, obj2, obj3)) // {a: 1, b: 2, c: 3}

  console.log(Object.assign({}, obj1, obj2, obj3, obj4)) // {a: 'a', b: 2, c: 3}

  console.log(Object.assign({}, obj1) === obj1) // false

})();
```

## Компоненты высшего порядка (HOC)

> На компонентах высшего порядка построен Redux. Поэтому, немного теории, сделаем компонент, изменяющий props.

На прошлых уроках мы упоминали, что если нужен только `render()`, вместо класса можно написать функцию

```
const App = () => h('div', null, 'Hello, world!')
```

Подобную функцию можно высчитать, вернув её из другой функции

```
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<style>
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    background: #f5f5f5;
  }
</style>

<div id="mount-point"></div>

<script src="https://theonekit.github.io/index.js"></script>

<script type="text/babel">
  (function (global) {

    const {
      TextField,
      Typography,
      InputAdornment,
    } = material.core;

    const {
      Dashboard,
      Email,
      Lock,
    } = material.icons;

    const buttonStyle = {
      position: 'absolute',
      left: 'calc(50% - 20px - 10px)',
      marginBottom: '-25px',
      bottom: '0px',
      padding: '10px',
      height: '40px',
      width: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgb(255,65,108)',
      background: 'linear-gradient(145deg, rgba(255,65,108,1) 0%, rgba(255,75,43,1) 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const Button = (props) => (
      <div style={buttonStyle} onClick={props.onClick}>
        <div className="material-icons">
          arrow_forward
        </div>
      </div>
    );

    global.BeforeLoginPage = class extends React.Component {

      static defaultProps = {
        onLogin: (email, password) => console.log({ email, password }),
        initialEmail: '',
        initialPassword: '', 
      };

      constructor(props) {
        super(props);
        this.state = {
          email: props.initialEmail,
          password: props.initialPassword,
        };
        this.clickHandler = this.clickHandler.bind(this);
        this.emailChanged = this.emailChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
      }

      componentDidMount() {
        window.beforeLoginComponent = this;
      }

      componentWillUnmount() {
        delete window.beforeLoginComponent;
      }

      clickHandler() {
        this.props.onLogin(this.state.email, this.state.password);
      }

      emailChanged(e) {
        const target = e.target;
        const value = target.value;
        this.setState({
          email: value,
          password: this.state.password,
        });
      }

      passwordChanged(e) {
        const target = e.target;
        const value = target.value;
        this.setState({
          email: this.state.email,
          password: value,
        });
      }

      render() {

        const rootStyle = {
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        };

        const containerStyle = {
          position: 'relative',
          backgroundColor: '#fff',
          borderRadius: '25px',
          minHeight: '345px',
          width: '275px',
          display: 'flex',
          alignItems: 'stretch',
          flexDirection: 'column',
          padding: '10px',
        };

        const logoStyle = {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '75px',
          color: '#ed393d',
        };

        return (
          <div style={rootStyle}>
            <div style={containerStyle}>
              <div style={logoStyle}>
                <Dashboard style={{ fontSize: '36' }} />
                <Typography variant="h6">
                  MyAmazingApp
                </Typography>
              </div>
              <TextField helperText='Введите почту'
                onChange={this.emailChanged}
                value={this.state.email}
                variant='filled'
                label='Почта'
                type='email' />
              <TextField helperText='Введите пароль'
                onChange={this.passwordChanged}
                value={this.state.password}
                variant='filled'
                type='password'
                label='Почта' />
              <Button onClick={this.clickHandler} />
            </div>
          </div>
        );
      }

    }

    //ReactDOM.render(<BeforeLoginPage/>, document.querySelector('#mount-point'));

  })(window);
</script>

<script type="text/babel">
  (function (global) {

    const {
      AppBar,
      Toolbar,
      Typography,
      Button,
    } = material.core;

    const {
      Fragment,
    } = React;

    global.AfterLoginPage = ({ onLogout = () => console.log('logout') }) => (
      <Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <Typography style={{ flex: 1 }} variant="h6">
              MyAmazingApp
            </Typography>
            <Button onClick={onLogout} color="inherit">
              Выйти
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ paddingBottom: '64px' }}></div>
        <p>Вы вошли!</p>
      </Fragment>
    );

    //ReactDOM.render(<AfterLoginPage/>, document.querySelector('#mount-point'));

  })(window);
</script>
```

## Самостоятельная работа

### Задача 1

> Создайте компонент высшего порядка `applyColor`, которая передает компоненту ниже стиль `backgrounColor: 'magenta'`

```
const Box = (props) => h('div', props);
```

### Задача 2

> Каким образом соединить эти страницы?

Возможно, вы подумаете, что следующая иерархия будет правильной

```
//  ____________________________
//  |  ______________________  |
//  |  |                    |  |
//  |  |                    |  |
//  |  |                    |  |
//  |  |                    |  |
//  |  |                    |  |
//  |  |                    |  |
//  |  |____________________|  |
//  |  ^^^^^^^                 |
//  |  AfterLogin              |
//  |__________________________|
//  ^^^^^^^^^^^
//  BeforeLogin
```

Однако, эта иерархия не совсем правильная, так как в неё **предельно сложно добавить регистрацию** и другие страницы. Верной будет следующая иерархия, особенно, если в компоненте входа будут вложенные компоненты с ветвлением.

```
//  ___________________________________________________________________________________
//  |  ______________________    ______________________    _________________________  |
//  |  |                    |    |                    |    |  _____  _____  _____  |  |
//  |  |                    |    |                    |    |  |   |  |   |  |   |  |  |
//  |  |                    |    |                    |    |  |___|  |___|  |___|  |  |
//  |  |                    |    |                    |    |   ^^^    ^^^    ^^^   |  |
//  |  |                    |    |                    |    |         Pages         |  |
//  |  |                    |    |                    |    |                       |  |
//  |  |____________________|    |____________________|    |_______________________|  |
//  |  ^^^^^^^                   ^^^^^^^                   ^^^^^^                     |
//  |  BeforeLogin               Registration              AfterLogin                 |                
//  |_________________________________________________________________________________|
//  ^^^^^^^^^^^
//  ???????????
```

Подумайте, чем можно реализовать блок, помеченный вопросами, если внутри страницы `AfterLogin` будет такое же ветвление. Как экономно с точки зрения кода достучаться до вложенных компонентов? `window`?
