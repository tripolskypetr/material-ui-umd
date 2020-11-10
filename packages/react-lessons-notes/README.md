# react-lessons-notes

> Авторская учебная программа. Опенсорс курсы переподготовки разработчика [jQuery](https://jquery.com/) на [React](https://reactjs.org/)... Если вы плывете в jQuery, пошерстите интернет на предмет [лекции от WebForMyself](https://webformyself.com/category/premium/javascript-premium/jquerypremium/)...

## Содержание

 - [Урок 1. JSX](./lessons/lesson1.1/README.md)

 - [Урок 2. Инкрементальная игра](./lessons/lesson1.2/README.md)

 - [Урок 3. Введение в flexbox](./lessons/lesson1.3/README.md)

 - [Урок 4. HOC, with, window, верстка компонентов](./lessons/lesson1.4/README.md)

 - [Урок 5. Декомпозиция на ES6 модули. Подключение Redux](./lessons/lesson1.5/README.md)

 - [Урок 6. Хуки useState, useRef, useEffect, useCallback](./lessons/lesson2.1/README.md)

 - [Урок 7. Генератор гридов, useContext, роутинг](./lessons/lesson2.2/README.md)

## Особенности курса

Данный курс лекций предназначен для того, чтобы пересадить студента с условно устаревшего непосредственного взаимодействия с браузером на бандлеры так, чтобы он не потерял ориентацию в пространстве. Он не подходит для трудоустройства в кратчайший срок, так как заточен на обеспечение понимания происходящего, а не значение для бизнеса. Для наибыстрейшего трудоустройства я бы рекомендовал посмотреть на udemy лекции по Angular2 версии 7 от WebForMyself...

## Минимальная подготовка

Необходимо разрабатывать сайты на [Bootstrap](https://getbootstrap.com/) + jQuery в контексте базового понимания работы веб-страницы и отсутствия боязни кода, [синдрома самозванца](https://ru.wikipedia.org/wiki/Синдром_самозванца). Ниже я приведу несколько сниппетов, их понимание необходимо на уровне автоматизма...

Курс заточен на применение `material-ui-umd` для обеспечения совместимости учебных программ колледжей и институтов с современными наработками веба. Он не заточен трудоустроить вас в кротчайший срок, его задача обеспечить понимание практик. Если вы хотите трудоустроится, посмотрите в сторону [Angular2](https://angular.io/), на рынке вакансий ниже конкуренция, что полезно для входа на рынок.

### 0. Just Do IT

> Для того, чтобы научиться программировать, нужно жить программированием, загореться идеей программирования. Постоянно пробуйте написать программы, практикуйте творчество. Воюйте с рутиной, предлагая преподавателям написать программу за зачет автоматом, договаривайтесь и помните:

```
В этой жизни не провалилось ни одного стартапа: каждое последующее начинание было лучше, так как основывалось на предидущих.
```

Воспринимайте следующие пункты как домашнюю работу: **это нужно поютюбить**...

**Сделайте себе источник копипасты!** Это может быть [gist](https://gist.github.com/) или [github](https://github.com/).

### 1. Blink конкатенирует JavaScript и подает на исполнение в V8

> С точки зрения Blink `html` страница это `xml` код с текстом, заклинания JavaScript становятся магическими именно на стороне V8...

Следующий исходный код

```
<html>
<head>
  <script src="1.js"></script>
</head>
<body>
  <script src="2.js></script>
  <script src="3.js"></script>
</body>
</html>
```

Эквивалентен

```
<html>
<head>
  <script>/* Содержимое 1.js */</script>
</head>
<body>
  <script>/* Содержимое 2.js */</script>
  <script>/* Содержимое 3.js */</script>
</body>
</html>
```

V8 получит

```
/* Содержимое 1.js */
/* Содержимое 2.js */
/* Содержимое 3.js */
```

### 2. Асинхронное исполнение

> `setTimeout` ставит функцию в очередь к исполнению, а не запускает функцию. Это можно использовать, чтобы применить к странице два разных стиля подряд, а не последний стиль синхронного исполнения.

Следующий JavaScript код:

```
console.log(1)
setTimeout(() => console.log(2))
console.log(3)

```

Выведет:

```
1
3
2
```

### 3. Парсинг DOM древа

> При синхронном исполнении JavaScript содержимому тега script доступны лишь вышестоящие теги - если нужно дождаться загрузки страницы, сделайте `setTimeout` или подпишитесь на `DOMContentLoaded`. Тоже касается и сторонних скриптов, подключаемых на страницу...

Следующий код:

```
<body>
  <script>console.log(document.querySelector('p'))</script>
  <p>foo</p>
</body>
```

Выведет:

```
null
```

### 4. Замыкания. Пространства имен.

> Пространство имен ([namespace](https://www.typescriptlang.org/docs/handbook/namespaces.html)) - расширенная версия замыкания, пришедшая из TypeScript. Конструкция активно использовалась в [ExtJS](https://www.sencha.com/products/extjs/), [BackboneJS](https://backbonejs.org/). Пространства имен расширяют условную область видимости, выраженную переменной. Порядок объявления пространств имен не имеет значения (см. пункт 1), что позволяет декомпозировать приложение на файлы.

Следующий код:

```
<script>
var namespace;
(function(namespace) {

  namespace.a = 1;
  console.log(namespace)

})(namespace || (namespace = {}));
</script>

<script>
var namespace;
(function(namespace) {

  namespace.b = 1;
  console.log(namespace)

})(namespace || (namespace = {}));
</script>

<script>
var namespace;
(function(namespace) {

  namespace.c = 1;
  console.log(namespace)

})(namespace || (namespace = {}));
</script>
```

Выведет:

```
{
  a: 1
}
{
  a: 1,
  b: 1
}
{
  a: 1,
  b: 1,
  c: 1
}
```

### 5. Отличия var, let и const. ES6 лямбды как синтаксис объявления функций.

> Легко разобраться. Объявление `var` нечувствительно к вложенности, по сути, объявляет переменную на всю страницу. Объявление `let`, так же как и `const`, чувствительна к блоку, но к `const` нельзя присваивать после объявления...

```
/* var можно писать сколько угодно раз */
var a;
var a;
var a;
var a;
var a;
console.log(a) // undefined

/* классический пример неверного использования var. используйте var только для пространств имен */
for (var b = 1; b !== 10; b++) setTimeout(() => console.log(b)) // (9 раз) 10

/* особенность var можно обойти, создав копию значения переменной */
for (var c = 1; c !== 10; c++) setTimeout((c) => console.log(c), 0, c) // 1, 2, 3...

/* чреду условий для ветвления можно расписать в несколько строчек следующим образом*/
let isOk = true;
isOk = isOk && false;
isOk = isOk || true;
console.log(isOk) // true;

/* var объявляется на всю вкладку. let и const до вышестоящей открывающей фигурной скобки ({) */
var c = 1;
if (true) {
  var c = 2;
}
console.log(c) // 2;
let d = 1;
if (true) {
  let d = 2;
}
console.log(d) // 1

/* const можно изменять */
const obj = {};
obj.a = 1;
console.log(obj) // {a: 1}

/* но после объявления к const нельзя применять присваивание */
try {
  const e = 1;
  e = 2;
} catch {
  console.log('const можно изменять, но нельзя применять присваивание')
}
```

### 6. Циклы

> `String.prototype.replace` заменяет **только первое** найденное совпадение. Если нужно заменить все совпадения, нужно уметь выкрутиться из ситуации. Очень полезно, например, для нормализации пробелов в строке (заменяем два пробела на один, пока присутствует сочетание двух пробелов подряд).

```

const line = "В   траве    сидел   братишка, не       съешь, не   встанет  шишка";

const replaceAll = (str, from = "a", to = "b") => {
  let result = str;
  while (true) {
    const iter = result.replace(from, to);
    if (result.length === iter.length) {
      return result;
    } else {
      result = iter;
    }
  }
};

console.log(replaceAll(line, "  ", " ")) // В траве сидел братишка, не съешь, не встанет шишка

```

## Опциональная подготовка

### 7. CSS Селекторы

> Минимальное понимание [Element.prototype.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)...

```
<div class="foo"></div>
<div id="bar"></div>
<p class="baz"></div>

...

document.querySelector('.foo') // <div class="foo">...
document.querySelector('#bar') // <div id="bar">...
document.querySelector('p.baz') // <p class="baz">...
```

### 8. ООП

> Объектно-ориентированное программирование это классика, благо, легко ютюбится. Класс это множество функций, объединенное общими переменными. Интерфейс от абстрактного класса отличается наличием конструктора

```
class Foo {
  field = 'baz';
  bar() { console.log(this.field); }
}
new Foo().bar() // baz


class Operation {
  static PI = 3.14
  static getSquare(radius) {
    return Operation.PI * radius * radius
  }
}
console.log(Operation.getSquare(30)) // 2826


class Figure {
  getArea() { throw new Error("unimplemented"); }
}
class Rectangle extends Figure {
  constructor(height, width) {
    super();
    this.height = height;
    this.width = width;
  }
  getArea() {
    const square = this.width * this.height
    console.log(square)
  }
}
new Rectangle(10, 10).getArea() // 100

```

### 9. Манипуляция массивами в функциональном стиле

> Используя JavaScript, мы можем *сортировать*, *искать*, *итерировать*, *суммировать* элементы. В одну строчку. Это знать надо, это классика - как минимум, должно быть желание разобраться. Могу посоветовать [статью из блога Telerik](https://www.telerik.com/blogs/functional-programming-with-javascript-object-arrays).

```
const carts = [
  { name: "Drink", price: 3.12 },
  { name: "Steak", price: 45.15 },
  { name: "Drink", price: 11.01 }
];

console.log(carts.find((obj) => obj.name === "Steak")); // {name: "Steak", price: 45.15}, поиск по имени
console.log(carts.map((obj) => obj.price)) // [3.12, 45.15, 11.01], вывести цену
console.log(carts.sort((obj1, obj2) => obj1.price - obj2.price)) // [...], по возрастанию цены
console.log(carts.reduce((acm, cur) => acm + cur.price, 0)) // 59.28, сумма цен (для профи)
```

### 10. Деструктуризация, rest, spread

> Современный синтаксический сахар JavaScript, который позволяет экономить время

```
const obj1 = {a: 1}
const obj2 = {b: 2}
console.log({...obj1, ...obj2}) // {a: 1, b: 2}

const test = (...args) => console.log(args);
test(1,2,3,4,5) // [1, 2, 3, 4, 5];

const obj3 = { bar() { console.log('bar') }}
const {bar: foo} = obj3;
foo() // bar

const arr = [1,2,3]
const [first] = arr;
console.log({first}) // first

const logA = ({a}) => console.log(a)
const logFirst = ([first]) => console.log(first)
logA({a: 'a', b: 'b', c: 'c'}) // 'a'
logFirst([1,2,3,4,5]) // 1
```

### 11. Понимание Promise, async - await

> Вы должны понимать, как сделать функцию задержки и как это работает. Промис - инструмент стандартизации коллбеков, снабженный синтаксическим сахаром async - await

Без async - await

```
const sleep = (timeout = 1000) => new Promise((res) => 
  setTimeout(() => res(), timeout)
);

const test = () => {
  console.log('before');
  sleep().then(() =>
    sleep().then(() => 
      sleep().then(() => 
        console.log('after')
      )
    )
  );
};
```

С async - await

```
const sleep = (timeout = 1000) => new Promise((res) => 
  setTimeout(() => res(), timeout)
);

const test = async () => {
  console.log('before');
  await sleep()
  await sleep()
  await sleep()
  console.log('after')
};
```

### Урок 12. Контекст исполнения - отличия лямбды

```
const test = new class { foo = 'bar'; omg() { console.log(this) } }
setTimeout(test.omg) 
const test1 = new class { foo = 'bar'; omg = () => { console.log(this) } }
setTimeout(test1.omg) 
```