# amazing-dbtools

> Демо проект для инструментов взаимодействия с IndexedDB базой данных [idb-tools](../../lib/idb-tools)

## Как запустить?

 - Соберите umd дистрибутив, запустив команды ниже в корне копии этого репозитория

```
pwd # путь material-ui-umd
npm install
npm run build:umd
npm run build:types
```

 - Собирите [idb-tools](../../lib/idb-tools)

```
pwd # путь material-ui-umd/lib/idb-tools
npm run build
```

## Почему не WebSQL?

WebSQL существует в браузерах де-факто, но де-юре у него нет единого стандарта, что может привести к повсеместному исключению из состава браузеров. Кроме того, NoSQL база данных позволяет избежать издержок на ORM и оставить код чистым без строковых включений SQL запросов...