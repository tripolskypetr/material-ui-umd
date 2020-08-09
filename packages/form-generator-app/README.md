# Form generator app

> Это приложение позволяет ознакомиться с инструментами [virtual-router](../../lib/virtual-router) и [jsonschema-form](../../lib/jsonschema-form). В качестве объекта изучения будет использоваться абстрактная база профилей

## Техническое описание

Роутер использует поставщик контекста `Router`, который необходимо установить в месте, где потребуется осуществлять роутинг. В обязательном порядке его потомками могут быть только компоненты `Route`, получающие в свойства шаблонную ссылку и целевой компонент. Параметры из ссылки будут переданы в свойства компонента при инстанцировании. Роутер пробрасывает в консоль разработчика текущую ссылку (`routerUrl`) и функцию для перехода по ссылке (`routerGo`)

```
<Router>
  <Route url="/" component={Brief}/>
  <Route url="/list" component={List}/>
  <Route url="/one/:id" component={One}/>
</Router>

...

<Link url="/list">Cсылка</Link>

```

Генератор форм использует json шаблоны для вывода документов (`List`) и справочников (`One`). Документ это список карточек профилей, справочник эта сама карточка профиля. Оба компонента выводят данные из обработчика (`handler`), подразумевается, что это промис с http запросом на сервер. Шаблон состоит из вложенных объектов, основными полями которых являются `type` - тип поля, `name` - путь до целевого поля объекта из handler в формате [lodash get](https://lodash.com/docs/#get), `fields` - массив дочерних вложенных объектов, если текущий имеет тип группы. Поля для своего шаблона можно копипастить из этого примера.

```
<One fields={[
  {
    type: FieldType.Group,
    columns: '6',
    fields: [
      {
        type: FieldType.Line,
        title: 'Колонка слева',
        columns: '12',
      },
      {
        type: FieldType.String,
        name: 'login',
        title: 'Почта',
      },
      {
        type: FieldType.String,
        name: 'password',
        title: 'Пароль',
        description: 'От 6 символов',
      },
    ]
  },

  ...

]}/>
```

## Как запустить?

 - Соберите umd дистрибутив, запустив команды ниже в корне копии этого репозитория

```
pwd # путь material-ui-umd
npm install
npm run build:umd
npm run build:types
```

 - Соберите [virtual-router](../../lib/virtual-router)

```
pwd # путь material-ui-umd/lib/virtual-router
npm run build
```

 - Соберите [jsonschema-form](../../lib/jsonschema-form)

```
pwd # путь material-ui-umd/lib/jsonschema-form
npm run build
```

 - После, соберите это приложение

```
pwd # путь material-ui-umd/packages/form-generator-app
npm run build
```

## Совет

Используйте этот проект как шаблон для старта разработки, разобрав через <kbd>Ctrl</kbd> + <kbd>C</kbd> и <kbd>Ctrl</kbd> + <kbd>V</kbd> его содержимое