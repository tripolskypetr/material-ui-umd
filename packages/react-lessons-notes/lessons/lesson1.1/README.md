# Урок 1.

> Вводный урок, подразумевающий обсуждение 10 пунктов из введения, а так же основу React - [JSX](https://reactjs.org/docs/introducing-jsx.html)

## Как устроен React

React паразитирует на том, что программисты не хотят писать xml, они хотят писать код. Для этого была создана концепция JSX - шаблоны ui, которые пишутся из кода. Однако, оказалось, что подобные шаблоны легко совмещать вместе с алгоритмами [применения минимального количества изменений](https://github.com/tripolskypetr/quite/blob/master/docs/diff-render.md#применение-минимального-количества-изменений), например, [diff](https://en.wikipedia.org/wiki/Diff). JSX до транспиляции выглядит так:

```
const App = () => (
  <div>
    <p>Hello</p>
    <p>Word</p>
  </div>
);
```

После транспиляции получается следующий код:

```
const App = () => (
  React.createElement('div', null,
    React.createElement('p', 'Hello'),
    React.createElement('p', 'Word'),
  )
);
```

## Как работает функция `createElement`

> Функция `createElement` имеет примерно следующую реализацию:

```
function createElement(t, p, ...c) {
  return {
    type: t,
    props: p,
    child: c,
  };
}
```

Все просто. Помните, что делает оператор три точки? Правильно, он позволяет собрать текущий и все последующие аргументы в массив, например `function text(...args) { console.log(args); }`. Таким образом, результатом возвращения JSX будет объект следующего вида:

```
{
  type: "div",
  props: null,
  child: [
    {
      type: "p",
      props: {
        text: "Hello"
      },
      child: []
    },
    {
      type: "p",
      props: {
        text: "World"
      },
      child: []
    },
  ]
}
```

Именно на основе таких объектов React строит [Virtual DOM](https://reactjs.org/docs/faq-internals.html#what-is-the-virtual-dom). Подробнее почитать про JSX Factory можно в статье [по ссылке](https://ru.stackoverflow.com/questions/1059967/как-jsx-переводится-в-js-код).

P.S. Вы уже догадались, что `React` это пространство имен?

## Хватит болтовни, давайте писать код!

> Скорее всего, у вас возник вопрос, для чего это нужно. На самом деле ответ прост: готовые примитивы пользовательского интерфейса. Кнопки, поля ввода, боковые меню, контекстные меню и др. Дело в том, что их писали дорогущие инженеры и месяцами. Это норма, когда специалист с зарплатой 300 тысяч рублей три месяца ковыряет анимацию нажатия кнопки. Но ни один частник вам за это не заплатит. Поэтому, слава <kbd>Ctrl</kbd> + <kbd>C</kbd> / <kbd>Ctrl</kbd> + <kbd>V</kbd>

```
<div id="mount-point"></div>

<script src="https://theonekit.github.io/index.js"></script>
<script>

const TextField = material.core.TextField;
const h = React.createElement;

const App = () => h(TextField, {label:"outlined", placeholder: "omg", variant: "outlined"});

ReactDOM.render(h(App), document.querySelector('#mount-point'))

</script>
```

## Самостоятельная работа

### Задача 1

> Сверстайте через `createElement` следующий html код

```
<BODY BGCOLOR="FFFFFF">
<CENTER><IMG SRC="clouds.jpg" ALIGN="BOTTOM"> </CENTER>
<HR>
<a href="http://somegreatsite.com">Link Name</a>
is a link to another nifty site
<H1>This is a Header</H1>
<H2>This is a Medium Header</H2>
Send me mail at <a href="mailto:support@yourcompany.com">
support@yourcompany.com</a>.
<P> This is a new paragraph!
<P> <B>This is a new paragraph!</B>
<BR> <B><I>This is a new sentence without a paragraph break, in bold italics.</I></B>
<HR>
</BODY>
```

### Задача 2

> По каждому пункту из брифинга найдите видео на YouTube. Соберите ссылки в `txt` файл и покажите, брошу кости на [random.org](https://random.org/) и проверю! Если что-то не гуглится, напиши, я уточню.
