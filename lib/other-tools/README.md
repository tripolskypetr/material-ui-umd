# other-tools

> Прочие инструменты, кочующие из проекта в проект

## Что внутри?

 - **snack-tools**

  Легковесная альтернатива [notistack](https://github.com/iamhosseindhv/notistack/), если выводить [стек снекбаров](https://material-ui.com/components/snackbars/#notistack) на экране не нужно.

 - **state-tools**

  Легковесная альтернатива [redux](https://redux.js.org/), не обладающая `middleware` как классом и имеющая только один `reducer`. Подразумевается использование вместе с `fetch-tools` для сохранения токена. Реализует
  хук `useDispatch`, представляющий собой соединение `useReducer` и `useContext`...

 - **fetch-tools**

  Содержит хук `useFetch`, который возвращает функцию, вызывающую оригинальный `fetch` с примененными параметрами из вышестоящего контекста к заголовку запроса - способ сохранить [токен](https://en.wikipedia.org/wiki/JSON_Web_Token) на все приложение и применить к каждому запросу. Если приложение использует `state-tools`, то первым параметром функции `headers` будет состояние приложения, что позволяет удобно вытянуть токен

 - **i11n-tools**

  Инструменты интернационализации. Реализуют хук `useTr()`, который возвращает [tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) для *es6 format string*...

## Как собрать?

 - Соберите umd дистрибутив

```
pwd # путь material-ui-umd
npm install
npm run build:umd
npm run build:types
```

 - После, соберите этот инструмент

```
pwd # путь material-ui-umd/lib/other-tools
npm run build
```

## Пример работы

Посмотрите [form-generator-app](../../packages/form-generator-app), проще всего будет разобраться, как этим пользоваться.
