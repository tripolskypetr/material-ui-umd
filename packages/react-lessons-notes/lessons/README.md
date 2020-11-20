# Организационные вопросы

> Не имеющие отношения к содержимому лекций

## Вопросы

 - Что находится в файле `https://theonekit.github.io/index.js`?

> Скрипты для подключения `material-ui-umd` и других сторонних библиотек, код файла следующий

Все библиотеки можно взять из папки [3rdparty](https://github.com/tripolskypetr/material-ui-umd/tree/master/3rdparty) в корне этого репозитория

```
(function() {
  const template = (url) => `\x3Cscript type="text/javascript" src="${url}">\x3C/script>`;
  window.React || document.write(template("https://theonekit.github.io/3rdparty/react@16.13.1/react.development.js"));
  window.ReactDOM || document.write(template("https://theonekit.github.io/3rdparty/react-dom@16.13.1/react-dom.development.js"));
  window.pathToRegexp || document.write(template("https://theonekit.github.io/3rdparty/path-to-regexp@6.1.0/index.js"));
  window.useDebounce || document.write(template("https://theonekit.github.io/3rdparty/use-debounce@5.0.1/use-debounce.min.js"));
  window.classNames || document.write(template("https://theonekit.github.io/3rdparty/classnames@2.2.6/classnames.js"));
  window.material || document.write(template("https://theonekit.github.io/dist/material-ui.min.js"));
  window.form || document.write(template("https://theonekit.github.io/lib/form-tools/dist/form-tools.js"));
  window.router || document.write(template("https://theonekit.github.io/lib/router-tools/dist/router-tools.js"));
  window.ReactRedux || document.write(template("https://theonekit.github.io/3rdparty/react-redux@7.2.0/react-redux.min.js"));
  window.Redux || document.write(template("https://theonekit.github.io/3rdparty/redux@v4.0.5/redux.min.js"));
  window.Babel || document.write(template("https://theonekit.github.io/3rdparty/@babel/standalone@7.12.4/babel.min.js"));
})();

```