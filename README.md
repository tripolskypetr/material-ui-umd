# material-umd

> UMD дистрибутив ui тулкита [material-ui](https://github.com/mui-org/material-ui), поставляемый вместе с файлом описания типов typescript с пространствами имен глобального объекта. В комплекте свой роутер и генератор форм на основе json шаблона. Вы можете посмотреть [демо по ссылке](https://theonekit.github.io/)

![rkn](assets/img/rkn.png)

*Описание, при чем тут Роскомнадзор ниже по тексту*

## Ссылки

**Документация инструмента**

 - [Генератор форм на основе JSON шаблона](./lib/form-tools/README.md)
 - [Офлайн-копия сайта с документацией](packages/offline-docs/README.md)
 - [Создать свой umd дистрибутив](packages/how-it-is-made/README.md)
 - [Применение вместе с WordPress на ванильном JavaScript](packages/wordpress-interop/README.md)
 - [Пикеры даты и времени](packages/amazing-pickers/README.md)

**Лекции для новичков**

 - [Заметки по курсу лекций React](packages/react-lessons-notes/README.md)
 - [Заметки по курсу лекций JavaScript](packages/javascript-lessons-notes/README.md)

**FAQ**

 - [FAQ](./HOWTO.md)

## Брифинг

Начиная с версии 16.8 в React доступен хук [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer), реализующий паттерн [state reducer pattern](https://redux.js.org/). Как следствие, библиотека все больше начинает походить на полноценный фреймворк со своей методологией программирования. Отличительной особенностью так и остается миниатюрность: [легко интегрировать в другие решения](reactjs.org/docs/web-components.html#using-react-in-your-web-components), простейший к пониманию и легкий к отладке код прикладного программиста.

Однако, существующие системы сборки проектов назвать миниатюрными никак нельзя. Вследствие их основанности на конвейере микро-утилит, каждая из которых имеет зависимости на обособленных интернет-ресурсах, велик риск их не разрешения: проект фантомно перестает собираться. Например, такое произошло со студенческими проектами после [удаления бинарных дистрибутивов](https://github.com/sass/node-sass/issues/1911) старых версий node-sass.

Для фриланса, мне нужно сочетать простоту и миниатюрность как на этапе исполнения, так и во время сборки. Если я буду тратить все свое время на мониторинг зависимостей, мне некогда будет заниматься разработкой. Однако, мне очень нравится React и я не намерен возвращаться к временам Bootstrap и jQuery.

## А при чем тут роскомнадзор?

Оно бы все ничего, но те самые удаленные ресурсы, от которых зависит сборка проекта, размещаются на тех же облачных сервисах, что и зеркала [Telegram](https://en.wikipedia.org/wiki/Telegram_(software)). В итоге, помимо прекращения поддержки со временем и [устаревании ссылок](https://en.wikipedia.org/wiki/HTTP_404), лично я натыкался на ошибки вида [451](https://en.wikipedia.org/wiki/HTTP_451), что печально, так как нужно тратить время на поиск vpn.

## А есть ли альтернатива?

Есть! Мы можем использовать как сборщик модулей только [TypeScript](https://www.typescriptlang.org/). У него есть специальная синтаксическая конструкция, ["namespace"](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html#using-namespaces), которая транспилируется в замыкание. Компилятор конкатенирует замыкания из разных модулей в один файл, в результате чего получается работоспособная программа. Сам TypeScript Compiler [написан](https://github.com/microsoft/TypeScript/blob/master/src/compiler/core.ts) на namespaces и не имеет сторонних зависимостей.

![open-source-logo](assets/img/open-source-logo.png)

Мне не нравится вектор развития, выбранный TC39 языку JavaScript. На мой взгляд, модули, подгружаемые по ссылке с сервера (как это уже сделано в [Deno](https://denocode.com/)) делают мой код не моим. У меня возникает ощущение, что программист становится расходником для фреймворков, которыми владеют крупные корпорации. Пожалуйста, если вы расходник, закройте эту страницу.

## Где можно посмотреть примеры кода?

В папке packages будут размещаться приложения, написанные с этим инструментарием. **Особое внимание** следует уделить [form-generator-app](./packages/form-generator-app/STUDENTS.md), в этом проекте я использую генератор форм на основе *json-схемы* и роутер, разработанный специально для `material-ui-umd`. В этой же папке можно найти офлайн копию документации...

