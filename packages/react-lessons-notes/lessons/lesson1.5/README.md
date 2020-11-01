# Урок 5

> Применение Redux на примере приложения: приложение с nasty роутингом. Начинаем урок, вынося код из тегов script по файлам.

На прошлом уроке мы разобрали объект `window` и `hoc` (компоненты высшего порядка). Redux совмещает эти два инструмента, позволяя эффективно декомпозировать приложения, соблюдая [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself) (Don't repeat yourself).

## Пишем контейнер состояния (`reducer`)

> В дополнение ко вчерашнему коду напишем следующее. Контейнер состояния это основа того самого источника ветвления, помеченого на прошлом уроке вопросами. Он глобален на все приложение: в отдельном React приложении может крутиться только одна копия Redux. Обратите внимание: `loginReducer` при изменении состояния возвращает **новый** объект (сослаться на Object.assign из прошлой лекции).

```
<script type="text/babel">
  (function (global) {
    const {
      applyMiddleware,
      combineReducers,
      createStore,
    } = Redux;
    const initialState = {
      email: 'tripolskypetr@gmail.com',
      password: '',
    };
    const loginReducer = (state = initialState, action) => {
      switch (action.type) {
        case 'login-action':
          debugger
          const email = action.payload.email;
          const password = action.payload.password;
          const patch = {email, password};
          return Object.assign({}, state, patch);
        default:
          return state;
      }
    };
    const loggerMiddleware = () => (next) => (a) => {
      const date = Date.now();
      const action = JSON.stringify(a);
      console.log(date, action);
      return next(a);
    };
    const store = createStore(
      combineReducers({loginReducer}),
      applyMiddleware(
        loggerMiddleware,
        // loggerMiddleware
      ),
    );
    global.Store = store;
  })(window);
</script>
```

## Соединяем всё в кучу

> Обратите внимание на компоненты `Connected`. Сослаться на компонент высшего порядка (`hoc`) из прошлой лекции.

Следует заострить внимание на конструкции `<ReactRedux.Provider/>`, показать, как она транспилируется в `h()`. Кроме того, на примере `static defaultProps` можно показать ошибку `Warning: A component is changing an uncontrolled input of type email to be controlled.`, она происходит, когда в value в тег input прилетает `undefined`. Задайте значения по-умолчанию...

```
<script type="text/babel">

  let BeforeLoginPageConnected = null;
  {
    const mapStateToProps = (state) => ({
      initialEmail: state.loginReducer.email,
      initialPassword: state.loginReducer.password,
    });
    const mapDispatchToProps = (dispatch) => ({
      onLogin: (email, password) => dispatch({
        type: 'login-action', 
        payload: {
          email,
          password,
        }
      })
    });
    BeforeLoginPageConnected = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(BeforeLoginPage);
  }

  let AfterLoginPageConnected = AfterLoginPage;
  {
    /**
     * TODO: Реализовать выход из системы на примере
     * авторизации с отдельным reducer...
     */
  }

  let NastyRouterConnected = null;
  {
    const NastyRouter = (props) => {
      if (props.isAuthComplete) {
        return <AfterLoginPageConnected/>;
      } else {
        return <BeforeLoginPageConnected/>;
      }
    };
    const mapStateToProps = (state) => ({
      isAuthComplete: state.loginReducer.email && state.loginReducer.password,
    });
    NastyRouterConnected = ReactRedux.connect(mapStateToProps)(NastyRouter);
  }

  const App = () => (
    <ReactRedux.Provider store={Store}>
      <NastyRouterConnected/>
    </ReactRedux.Provider>
  );

  ReactDOM.render(<App/>, document.querySelector('#mount-point'));
</script>
```

## Фокус

> Мы можем посмотреть из отладочных инструментов:

 - `Store.getState()` - текущее состояние приложения

 - `Store.dispatch({type: 'login-action', payload: {email: 'b00x@ya.ru', password: '123}})` - авторизоваться не трогая мышку

 - `beforeLoginComponent.props` - входные параметры компонента авторизации

## Солнце светит, негры пашут. Такова работа наша

> Мы не изменяли компоненты `BeforeLoginPage` и `AfterLoginPage`. Поэтому, верстать их могут негры, никак не соприкасаясь с твоим кодом. Командная работа

## Последующее взаимодействие с учеником

Для закрепления материала следует выполнить несколько работ с мастером. Задания легко можно выцепить по запросу `flutter ui challenges` или в приложении [Kitten tricks](https://github.com/akveo/kittenTricks). На всякий случай, я забекапил скриншоты макетов в [app-list.pdf](./app-list.pdf) из [этого](https://github.com/lohanidamodar/flutter_ui_challenges) репозитория.


## Самостоятельная работа

### Задача 1

> Создайте `logoutReducer`, который будет осуществлять выход из системы

### Задача 2

> Посмотрите в ютюбе лекцию про `javascript event loop`

### Задача 3

> Поищите в ютюбе про модули ES6 в JavaScript - инструментарий, позволяющий исключить работы внутри `namespace` для крупных корпораций. Это неизбежная издержка производства при командной работе.

Каждый модуль описывает именнованные экспорты и один экспорт по умолчанию (default). Последний именуется в импортере, через не указывание фигурных скобок. Он должен идти первым. Модуль также исполняется ровно один раз, как и `namespace`, просто доступ к нему осуществляется используя путь как уникальную константу, так как путь к файлу уникален по определению

**index.html**
```
<script type="module">
  import alert3, {alert1, alert2} from "./utils.js";
  alert1('foo');
  alert2('bar');
  alert3('baz');
</script>
```

Также доступны реекспорты

 - export { default as App } from './App'
 - export { default } from './App'

**utils.js**
```
export const alert1 = (text) => prompt(text);
export function alert2(text) {
  prompt(text);
};
export default alert1;
```
