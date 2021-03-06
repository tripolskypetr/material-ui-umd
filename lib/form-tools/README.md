# form-tools

> Генератор форм по 12-колоночной сетке для быстрой верстки адаптивных для мобильных устройств справочников (One) и документов (List). Посмотрите [form-generator-app](../../packages/form-generator-app), проще всего будет разобраться, как этим пользоваться.

## Что это?

Часто при написании академических работ к простейшему backend, осуществляющему взаимодействие с sql базой данных, нужно сделать примитивную верстку. И так как еще больше упростить синтаксис sql не представляется возможным,
приходит в голову мысль сэкономить время на фронтенде...

Кроме того, использование [jQuery](https://jquery.com/) в мире современного веба смотрится непрезентабельно: код заведомо не будет интересен потенциальному работодателю в рамках портфолио. Исправить проблему можно применив этот инструмент, так как точкой входа генератора форм будет полноценное веб-приложение на React и material-ui-umd.

## Как собрать?

 - Соберите umd дистрибутив, запустив команды ниже в корне копии этого репозитория

```
pwd # путь material-ui-umd
npm install
npm run build:umd
npm run build:types
```

 - После, соберите этот инструмент

```
pwd # путь material-ui-umd/lib/form-tools
npm run build
```

## Пример работы

Посмотрите [form-generator-app](../../packages/form-generator-app), проще всего будет разобраться, как этим пользоваться.
