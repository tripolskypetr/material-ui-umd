
# mobx-app

> Управление состоянием приложения путем инъекции [store](https://mobx.js.org/defining-data-stores.html) компонентами высшего порядка. Подобная композиция кода экономит `boilerplate` и позволяет с легкостью осуществить `mocking`...

## Как запустить?

 - Соберите umd дистрибутив, запустив команды ниже в корне копии этого репозитория

```
pwd # путь material-ui-umd
npm install
npm run build:umd
npm run build:types
```

 - После, соберите это приложение

```
pwd # путь material-ui-umd/packages/mobx-app
npm run build
```
