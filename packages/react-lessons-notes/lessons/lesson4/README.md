# Урок 4

> Компоненты-функции (с прошлого урока). Компоненты высшего порядка (hoc для логгирования props). Применение Redux на примере приложения: приложение с nasty роутингом. Выносим код из тегов script по файлам.

 - как работает `window` на примере `with() { }`

 - с этого урока разделяем компоненты на разные теги script. потом показываем, как раскидать по файлам

 - показываем HOC на примере `const connect = (component) => (props) => h(component, props);`

## Оператор `with() { }`

> Используя `document.querySelector` или `document.getElementById` мы можем устанавливать элементам `DOM` древа стили

```
<script>
/* Следующий код */
{
  const body = document.querySelector('body');
  body.style.backgroundColor = 'green';
  body.style.height = '100vh';
  body.style.margin = '0';
  body.style.padding = '0';
  body.style.border = '25px solid yellow';
}

/* Эквивалентен этому */
{
	const body = document.querySelector('body');
  with (body.style) {
    backgroundColor = 'green';
    height = '100vh';
    margin = '0';
    padding = '0';
    border = '25px solid yellow';
  }
}
</script>
```

## Условно, все скрипты на странице запускаются в `with (window) { ... }`

> Используя `window`, можно перебрасывать значения между скриптами. Объект `window` является инструментом, позволяющим объявить [синглтон](https://ru.wikipedia.org/wiki/Одиночка_(шаблон_проектирования))

```
<script>
  console.log(window.alert === alert) // true
</script>
<script>
  if (true) {
    const func = () => 'bar';
    window.foo = func;
  }
</script>
<script>
  console.log(foo()) // 'bar'
  console.log(func()) // Uncaught ReferenceError: func is not defined
</script>
```

## Как работает `Object.assign()`

> Object.assign позволяет создавать копии объектов, а так же сливать множества входных параметров.

```
(function() {

  const obj1 = {a:1};
  const obj2 = {b:2};
  const obj3 = {c:3};

  const obj4 = {a:'a'};

  console.log(Object.assign({}, obj1, obj2, obj3)) // {a: 1, b: 2, c: 3}

  console.log(Object.assign({}, obj1, obj2, obj3, obj4)) // {a: 'a', b: 2, c: 3}

})();
```

## Компоненты высшего порядка (HOC)

> На компонентах высшего порядка построен Redux. Поэтому, немного теории, сделаем компонент, изменяющий props.

На прошлых уроках мы упоминали, что если нужен только `render()`, вместо класса можно написать функцию

```
const App = () => h('div', null, 'Hello, world!')
```

Подобную функцию можно высчитать, вернув её из другой функции

```
<div id="mount-pount"></div>

<script src="https://theonekit.github.io/index.js"></script>

<script>
	(function() {
  	const {
    	createElement: h,
    } = React;
    function createA() {
      return function() {
        return h('div', null, 'Hello, world!');
      }
    }
    const A = createA();
    ReactDOM.render(h(A), document.querySelector('#mount-pount'));
  })();
</script>
```

Функции, которая высчитывает функцию компонента, можно передать параметры.

> По сути, компонент высшего порядка реализует следующую логику: мы создаем *НОВЫЙ* компонент, используя *старый* и *функцию-конструктор*...

```
<style>
  html, body {
    magrin: 0;
    padding: 0;
    background: whitesmoke;
    height: 100vw;
  }
</style>

<div id="mount-point"></div>

<script src="https://theonekit.github.io/index.js"></script>

<script>
	(function() {
  
  	const {
    	createElement: h,
    } = React;
    
    const {
    	Paper,
    	List,
    	ListItem,
      ListItemText,
   	} = material.core;
    
    const ItemInternal = (props) => h(ListItem, null, 
    	h(ListItemText, {primary: props.children})
    );
    
    const applyUpperCase = (component) => (props) => {
    	if (typeof props.children === 'string') {
      	const children = props.children.toUpperCase()
      	const newProps = Object.assign({}, props, {children});
        return h(component, newProps);
      } else {
      	return h(component, props);
      }
    };
    
    /**
     * Изначально псевдоним старой, в последующем переписываемый 
     * на новую функцию
     */
    const ItemConnected = ItemInternal // applyUpperCase(ItemInternal);
    
    const App = () => h(Paper, null,
      h(List, null, 
        h(ItemConnected, null, 'Item 1'),
        h(ItemConnected, null, 'Item 2'),
        h(ItemConnected, null, 'Item 3'),
      ),
    );

    const mountPoint = document.querySelector('#mount-point');
    ReactDOM.render(h(App), mountPoint);

  })();
</script>
```

## Пишем приложение с авторизацией

 - TODO: не забыть показать выброс this в объект window из componentDitMount

## Перед уроком 5

> Перед уроком 5 следует выполнить несколько работ с мастером. Задания легко можно выцепить по запросу `flutter ui challenges` или в приложении [Kitten tricks](https://github.com/akveo/kittenTricks). На всякий случай, я забекапил скриншоты макетов в [app-list.pdf](./app-list.pdf) из [этого](https://github.com/lohanidamodar/flutter_ui_challenges) репозитория.

## Самостоятельная работа

### Задача 1

> Создайте функцию высшего порядка `applyColor`, которая передает компоненту ниже стиль `backgrounColor: 'magenta'`

```
const Box = (props) => h('div', props);
```

### Задача 2

> Напишите `action`, который позволит пользователю выйти из системы

```
Вам потребуется очистить `login` и `password`
```
