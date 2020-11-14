# material-pickers

> Пикеры даты и времени, портированные из [v0.material-ui.com](https://v0.material-ui.com). Минимальные по размеру относительно альтернатив

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
pwd # путь material-ui-umd/lib/material-pickers
npm run build
```

## Пример работы

Посмотрите [form-generator-app](../../packages/form-generator-app), проще всего будет разобраться, как этим пользоваться.
