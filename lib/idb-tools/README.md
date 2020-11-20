# idb-tools

> Порт [jakearchibald/idb](https://github.com/jakearchibald/idb/tree/c0f45f50dfa62e754e155c1fee8e96bca443cdad), осуществляющий обертку idb в контекст для стандартизации взаимодействия с базой данных

Провайдер `DatabaseProvider` передает входные параметры насквозь в `openDB`. Далее, инстанция базы данных доступна через хук `useDb`...

## Как собрать?

 - Соберите этот инструмент

```
pwd # путь material-ui-umd/lib/idb-tools
npm run build
```
