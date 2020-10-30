## Урок 2.

> Урок 2. [Инкрементальная игра](https://en.wikipedia.org/wiki/Incremental_game). Знакомимся с внутренним состоянием компонента. Помните определение класса, которое я дал ранее: "Множество функций, прибитое гвоздями к нескольким переменным". Никому не говорите это определение...

## Методы жизненного цикла, props, state

React регламентирует минимальное множество внутренних переменных и функций класса компонента. Компоненты это строительные леса, опираясь на которые возводятся те самые примитивы, которые мы используем на сайтах. Но, чтобы не плодить сущности, нет разделения. Ниже я перечислю самое важное, что нужно знать

Функции:

| Наименование, параметры     | Описание                                                |
| --------------------------- | ------------------------------------------------------- |
| constructor(props)          | Привязка контекста методов, инициализация state         |
| componentDidMount()         | Компонент появился в body. *запустите таймеры*          |
| componentWillUnmount()      | Будет удален из body, **остановите таймеры**            |
| render()                    | Возвращает JSX исходя из props и state                  |
| setState(state)             | Обновляет state. Запускает изменение страницы           |

Переменные:

| Наименование                | Описание                                                |
| --------------------------- | ------------------------------------------------------- |
|            props            | Входные параметры, вероятно, привязаны к state родителя |
|            state            | Для изменения входных параметров потомка                |

## Делаем кликер

> Базовый пример использования render() и setState(). Если вы видите ошибки вида `Uncaught TypeError: Cannot read property 'setState' of undefined`, значит, вы забыли привязать (`bind`) функцию к классу в конструкторе.

```
<div id="mount-point"></div>

<script src="https://theonekit.github.io/index.js"></script>

<script>

  const h = 10;

  (function() {
  
    // На прошлом уроке мы проходили подключение без деструктуризации
    const {
      createElement: h,
    } = React;

    const {
      Button,
    } = material.core;

    class Clicker extends React.Component {
      constructor(props) {
      	super(props);
        this.state = {value: props.initialValue};
        // Привязка пользовательской функции к классу
        this.increment = this.increment.bind(this);
      }
      increment() {
      	this.setState({value: this.state.value + 1});
      }
      render() {
        return h(Button, {
          variant: "contained",
          color:"primary",
          onClick: this.increment,
        }, this.state.value);
      }
    }

    const mountPoint = document.querySelector('#mount-point');
    ReactDOM.render(h(Clicker, {initialValue: 10}), mountPoint);
  
  })();

  console.log(h) // 10;

</script>
```

## Делаем автокликер

> Базовый пример использования `componentDidMount` и `componentWillUnmount`. Если вы видите ошибку вида `Warning: Can't perform a React state update on an unmounted component`, значит, вы не остановили таймер в `componentWillUnmount`. Фрагмент это корзинка, которая позволяет вернуть из `render` сразу два компонента.

```
<div id="mount-point"></div>

<script src="https://theonekit.github.io/index.js"></script>

<script>

  (function() {
  
    const {
      createElement: h,
      Fragment,
    } = React;

    const {
      Button,
      Checkbox,
    } = material.core;
    
    class AutoClicker extends React.Component {
    	interval = null;
    	constructor(props) {
      	super(props);
        this.state = {v: 0};
      }
      componentDidMount() {
      	this.interval = setInterval(() => this.setState(({v}) => ({v: v + 1})));
      }
      componentWillUnmount() {
      	//clearInterval(this.interval);
      }
      render() {
      	return h('p', null, `Итерация: ${this.state.v}`);
      }
    }

    class App extends React.Component {
      constructor() {
      	super();
        this.state = {enabled: true};
        this.toggle = this.toggle.bind(this);
        this.renderClicker = this.renderClicker.bind(this);
      }
      toggle() {
      	this.setState((prev) => ({enabled: !prev.enabled}));
      }
      renderClicker() {
        if (this.state.enabled) {
        	return h(AutoClicker);
        }	else {
        	return null;
        }
      }
      render() {
        return h(Fragment, null,
        	h(Checkbox, {checked: this.state.enabled, onChange: this.toggle}),
          this.renderClicker(),
        );
      }
    }

    const mountPoint = document.querySelector('#mount-point');
    ReactDOM.render(h(App), mountPoint);
  
  })();

</script>
```

## Делаем TodoList

> Вывод списка. Если вы видите ошибку вида `Warning: Encountered two children with the same key`, значит вы либо не указали key, либо он не уникален. Для создания ключа на лету можно использовать [unix timestamp](https://en.wikipedia.org/wiki/Unix_time) (`Date.now()`) или случайную строку `Math.random().toString(36).substring(7)`. Также подойдет порядковый номер элемента. key нужен для сравнения объектов, так как `{} === {} // false`, сравнение происходит по указателю на область памяти. Не взирая на то, что объекты одинаковы сейчас, их потенциально можно изменить. На работе вам дадут такую строку, вероятно, она будет называться `id`...

```
<div id="mount-point"></div>

<script src="https://theonekit.github.io/index.js"></script>

<script>

  (function() {
  
  	const {
      createElement: h,
      Fragment,
    } = React;
    
    const {
      Button,
    } = material.core;

    class TodoList extends React.Component {
    
    	constructor(props) {
      	super(props);
        this.state = { items: [], };
        this.addItem = this.addItem.bind(this);
        this.renderList = this.renderList.bind(this);
      }
      
      addItem() {
      	const {items} = this.state;
        items.push(prompt('Название пункта:'));
        this.setState({items});
      }
      
      renderList() {
      	const list = [];
        for (let i = 0; i !== this.state.items.length; i++) {
        	const item = this.state.items[i];
          list.push(h('li', {key: list.length}, item));
        }
        return list;
      }
      
      render() {
      	return h(Fragment, null,
        	h(Button, {onClick: this.addItem}, 'Добавить пункт'),
        	h('ul', null, this.renderList()),
        );
      }
    
    }
    
    const mountPoint = document.querySelector('#mount-point');
    ReactDOM.render(h(TodoList), mountPoint);

  })();

</script>
```

## Самостоятельная работа

В этот раз задач будет несколько...

### Задача 1

> Сделайте кнопку, текст поверх которой будет меняться по клику в следующем порядке

```
tick -> tack -> toe
```

### Задача 2

> Сделайте автоматическое tick -> tack -> toe, срабатывающее по таймеру

### Задача 3

> Сделайте три кнопки, которые будут добавлять в список ul наименования геометрических фигур

```
Прямоугольники, Круги, Квадраты
```
