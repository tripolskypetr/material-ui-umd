# redux-app

> Устаревший шаблон для старта проекта с material-umd и Redux. Для тех, кто не умеет пользоваться контекстом и хуками.

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
pwd # путь material-ui-umd/packages/redux-app
npm run build
```

Так же, попробуйте использовать этот инструмент в сочетании с [Apache Cordova](https://cordova.apache.org/). Компоненты пользовательского интерфейса отлично работают с сенсорным экраном.

## Обратите внимание

Обратите внимание: NastyRouter используется как пример использования
Redux. Я настоятельно рекомендую посмотреть в сторону [router-tools](../../lib/router-tools)
из [form-generator-app](../form-generator-app)

## Скриншот

![screenshot](../../assets/img/screenshot.png)
