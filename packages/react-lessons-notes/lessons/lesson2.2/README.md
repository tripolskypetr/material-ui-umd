# Урок 7.

> Нормальный роутинг (useContext + Router). Генератор гридов, который скорее всего будет свой по месту трудоустройства.

В этом уроке мы познакомимся с One компонентом - инструментом быстрого прототипирования форм. Он полезен для личного устройства, маловероятно, что его удастся принести на новое место работы, но скорее всего на месте работы уже будет что-либо подобное. Также, закроем вопрос роутинга.

## Правильная реализация роутера

> В уроке `1.5` я подчеркнул, что подобная реализация переключения между страницами на `Redux` это **Nasty**-роутинг. Подобная реализация допустима только при обучении. Правильной будет реализация, использующая `Context` API.

Меняя свойство `currentUrl` мы можем перемещаться между страницами. Но, как достучаться до него, если приложение сверстано с огромной вложенностью?

```
<div id="mount-point"></div>

<script src="https://theonekit.github.io/index.js"></script>

<script type="text/babel">
  (function() {
  
    const {
      useState,
      useContext,
    } = React;

    const {
      Router,
      Route
    } = router;

    const A = ({id = 'unset'}) => <p>A: {id}</p>;
    const B = ({id = 'unset'}) => <p>B: {id}</p>;

    const App = () => (
      /**
       * vk.com/id1
       */
      <Router currentUrl="/b/some-key">
        <Route url="/a" component={A}/>
        <Route url="/b/:id" component={B}/>
      </Router>
    );

    ReactDOM.render(<App/>, document.querySelector('#mount-point'))

  })();
</script>
```

## Используем контекст для передачи текущего *роута*

> Мануально пробросить коллбек через входные параметры займет невероятно много времени. Это легко сделать с контекстом. Сеттер не меняется при рендерингах

```
<style>
  body {
    font-family: sans-serif;
  }
</style>

<div id="mount-point"></div>

<script src="https://theonekit.github.io/index.js"></script>

<script type="text/babel">
  (function () {

    const {
      Fragment: F,
    } = React;

    const {
      Button,
      Typography,
    } = material.core;

    const {
      useState,
      useContext,
      createContext,
    } = React;

    const {
      Router,
      Route
    } = router;

    const A = ({ children = null }) => <F>{children}</F>;
    const B = ({ children = null }) => <F>{children}</F>;
    const C = ({ children = null }) => <F>{children}</F>;
    const D = ({ children = null }) => <F>{children}</F>;
    const E = ({ children = null }) => <F>{children}</F>;
    const G = ({ children = null }) => <F>{children}</F>;
    const H = ({ children = null }) => <F>{children}</F>;
    const I = ({ children = null }) => <F>{children}</F>;

    const Tree = () => (
      <A>
        <B>
          <C>
            <D>
              <E>
                <G>
                  <H>
                    <I>
                      <From />
                    </I>
                  </H>
                </G>
              </E>
            </D>
          </C>
        </B>
      </A>
    );

    const RouterContext = createContext((url) => console.log({url}));
    const useRouter = () => useContext(RouterContext);

    const From = () => {
      const go = useRouter();
      const onClick = () => go('/omg');
      return (
        <Button onClick={onClick}>
          Go!
        </Button>   
      );
    };

    const To = () => (
      <Typography variant="h4">
        Here we are
      </Typography>
    );

    const App = () => {

      const [url, setUrl] = useState('/');

      /**
       * Сеттер не меняется при рендерингах
       */
      return (
        <RouterContext.Provider value={(u) => setUrl(u)}>
          <Router currentUrl={url}>
            <Route url="/" component={Tree} />
            <Route url="/omg" component={To} />
          </Router>
        </RouterContext.Provider>
      );
    };

    ReactDOM.render(<App />, document.querySelector('#mount-point'))

  })();
</script>
```

## Проблема линтеров

> Обычно, окружение программиста, работающего на предприятие, не позволяет ему публиковать исходные коды, которые содержат строки более 120 символов в ширину. Однако, [адаптивная верстка по 12 колоночной сетке](https://getbootstrap.com/docs/4.0/layout/grid/) это корпоративный стандарт. 

```
<div class="row">
  <div class="col-sm-5 col-md-6">.col-sm-5 .col-md-6</div>
  <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0">.col-sm-5 .offset-sm-2 .col-md-6 .offset-md-0</div>
</div>
<div class="row">
  <div class="col-sm-6 col-md-5 col-lg-6">.col-sm-6 .col-md-5 .col-lg-6</div>
  <div class="col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0">.col-sm-6 .col-md-5 .offset-md-2 .col-lg-6 .offset-lg-0</div>
</div>
```

## Выход из положения

> Очень часто на крупных предприятиях есть внутренний опенсорс - наборы компонентов, которые применяются из проекта в проект. Велика вероятность, что проблему линтеров решили локально генератором форм. Примером такого генератора можно рассматривать [One компонент](https://github.com/tripolskypetr/material-ui-umd/blob/master/packages/form-generator-app/STUDENTS.md). Для него есть [онлайн демо](https://theonekit.github.io/wordpress-interop/)...

Сколько времени уйдет сверстать такое демо?

```
{
  "type": "group",
  "fields": [
    {
      "type": "line",
      "title": "Вид стекла"
    },
    {
      "title": "Бронза",
      "type": "string",
      "name": "Бронза"
    },
    {
      "type": "group",
      "fields": [
        {
          "type": "line",
          "title": "Толщина стекла"
        },
        {
          "title": "10 мм",
          "type": "string",
          "name": "10 мм"
        },
        {
          "type": "group",
          "fields": [
            {
              "type": "line",
              "title": "Форма изделия"
            },
            {
              "type": "group",
              "fields": [
                {
                  "type": "line",
                  "title": "Круг"
                },
```

## Структура JSON-а

> Примечательными являются следующие свойства, где `type` - тип поля, а `fields` - вложенные поля. Посмотреть опциональные свойства полей [можно тут](https://github.com/tripolskypetr/material-ui-umd/blob/master/lib/jsonschema-form/src/common/IField.ts).

```
{
  type: '',
  fields: [

  ]
}
```

## Входные параметры One компонента

> `One` компонент регламентирует следующие входные параметры

```
interface IOneProps {
  /**
    * Позволяет загружать данные в компонент
    */
  handler?: () => Promise<any> | any;
  /**
    * Вызывается при ошибке в handler
    */
  fallback?: (e: Error) => void;
  /**
    * Вызывается после изменения и передает измененный
    * объект прикладному программисту
    */
  change: (object) => void;
  /**
    * Массив полей, выводимый в компоненте
    */
  fields: IField[];
  /**
    * Префикс для формирования ключей элементов
    */
  prefix?: string;
  /**
    * Плейсхолдер, показываемый во время загрузки данных
    */
  LoadPlaceholder?: null | material.Element;
}
```

## Как это можно использовать?

> Скаффолдинг курсового или дипломного проекта. Сайт [https://theonekit.github.io](https://theonekit.github.io) можно использовать повторно для вывода любых SQL данных. Исходный код сайта [лежит в папке](https://github.com/tripolskypetr/material-ui-umd/tree/master/packages/form-generator-app).

## Пишем резюме

> Основным преимуществом при первом трудоустройстве будет возможность осуществить [демпинг цен](https://ru.wikipedia.org/wiki/Демпинг) и [метод проб и ошибок](http://lurkmore.to/Метод_научного_тыка). Однако, не писать резюме нельзя: вам в обязательном порядке потребуется что-то показать. Пример резюме я приложу к этой лекции.

Навыки, которые можно указать в резюме React разработчику

 - React

 - Redux

 - [Next JS](https://nextjs.org/) (гуглим промо или ждем скидок и [смотрим лекцию](https://www.udemy.com/))

 - [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)

 - React-Hooks

 - material-ui

 - Material Icons

 - Bootstrap

 - ...

HR будет искать в вашем резюме знакомые слова с предприятия, применяя сложность вычислений головного мозга не выше `o2`. Поэтому, рационально, в дополнении к предложенному списку, дописать [Jira](https://www.atlassian.com/software/jira) и [Gitlab Community](https://about.gitlab.com/install/ce-or-ee/). P.S. гитлаб был выбран из-за удобной интеграции в Jira, которая оставляет комментарии по коммитам и merge request...

Подумайте, какие ключевые слова собьют конкуренцию. Если с React ничего не получается, попробуйте [Angular2](https://angular.io/): фронтовые паттерны везде одинаковы, но приток новичков в индустрию меньше. Одно другому не мешает, а дополняет (тот же Redux можно назвать паттерном, так как похожее API было применено в [стандартной библиотеке](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) - это `dispatch`, reducer подразумевается. `state-reducers-pattern`). Перед тем, как что-либо учить, смотрите количество вакансий на [HeadHunter](https://hh.ru/) - проверяем гипотезы, отдельный привет Flutter и VueJS, их учить не стоит.

## Копипаста

> Пишите, что у вас высшее образование. Нет, вы не поняли, у вас высшее образование. Пишите любые лекции со стороны. Это **никто не проверяет**

Фото и контакты должны быть в обязательном порядке, наведите марафет.

 - [Программист С++/Qt](./Программист_С++_Qt.docx)

 - [Программист Angular 2 + ASP.Net Core](./Программист_Angular2_ASP.NetCore.docx)

 - [Программист React + NextJS](./Программист_React+NextJs.docx)

## Это всё?

> Пока что, да. Далее я могу помочь [в Skype](skype://live:tripolskypetr) на личной консультации по конкретному вопросу)
