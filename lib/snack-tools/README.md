# virtual-router

> Легковесная альтернатива [notistack](https://github.com/iamhosseindhv/notistack/), если выводить [стек снекбаров](https://material-ui.com/components/snackbars/#notistack) на экране не нужно.

## Как собрать?

Соберите umd дистрибутив

```
pwd # путь material-ui-umd
npm install
npm run build:umd
npm run build:types
```

 - После, соберите этот инструмент

```
pwd # путь material-ui-umd/lib/snackbar-tools
npm run build
```

## Пример работы

Посмотрите [form-generator-app](../../packages/form-generator-app), проще всего будет разобраться, как этим пользоваться.
