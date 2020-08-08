# boilerplate-app

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
pwd # путь material-ui-umd/packages/boilerplate-app
npm run build
npx open index.html # быстрое открытие файла в браузере
```

 - Для запуска (после сборки) откройте `index.html` в директории приложения

Так же, попробуйте использовать этот инструмент в сочетании с [Apache Cordova](https://cordova.apache.org/). Компоненты пользовательского интерфейса отлично работают с сенсорным экраном.

## Обратите внимание

Обратите внимание: NastyRouter используется как пример использования
Redux. Я настоятельно рекомендую посмотреть в сторону virtual-router
из [form-generator-app](../form-generator-app)

## Скриншот

![screenshot](../../assets/img/screenshot.png)
