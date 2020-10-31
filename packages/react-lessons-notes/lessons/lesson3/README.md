# Урок 3.

> Изучаем flexbox. Flexbox - острие инструментария, созданного для компоновки пользовательских интерфейсов. Верстка

## Начать пользоваться flexbox

> Для того, чтобы начать пользоваться flexbox нужно изучить два основных кейса использования. Остальное выучить будет сподручнее в рамках практики.

Следующий код (прямоугольник по центру). Обратите внимание на `flex-direction`, это важно для отрисовки списка.

```
<div style="display: flex; align-items: center; justify-content: center; flex-direction: row; height: 100vh; width: 100vw;">
  <div style="background: magenta; height: 50px; width: 50px;">
  </div>
</div>
```

Выведет прямоугольник цвета `magenta` по центру страницы

```
// __________________________________________________
// |                                                |
// |                                                |
// |                                                |
// |               _________________                |
// |               |               |                |
// |               |  width: 50px  |                |
// |               |  height: 50px |                |
// |               |_______________|                |
// |                                                |
// |                                                |
// |                                                |
// |________________________________________________|
```

Следующий код (по размеру родителя). Обратите внимание на `flex-direction`, это важно для отрисовки списка.

```
<div style="display: flex; align-items: stretch; justify-content: stretch; flex-direction: row; height: 100vh; width: 100vw;">
  <div style="background: cyan; flex: 1">
  </div>
</div>
```

Выведет прямоугольник цвета `cyan`, растянув по размеру родителя

```
// ___________________________________________________
// |  _____________________________________________  |
// |  |                                           |  |
// |  |                                           |  |
// |  |                                           |  |
// |  |                                           |  |
// |  |                                           |  |
// |  |                 flex: 1                   |  |
// |  |                 ^^^^^^^                   |  |
// |  |                                           |  |
// |  |                                           |  |
// |  |                                           |  |
// |  |___________________________________________|  |
// |_________________________________________________|
```

## При написании компонентов используйте следующую обвязку

> Это нужно, чтобы верстка не поехала

Обвязка имеет следующий вид

```
<style>
  .root {
    position: relative;
    overflow: hidden;
  }
  .container {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
  }
</style>

<div class="root">
  <div class="container">
    ...
  </div>
</div>
```

Элемент с позицией `absolute` позиционируется от ближайшего родителя с позицией `relative` и не может влиять на его размер - верстка не едет. Используя `overflow: hidden;` можно предохраниться от прочих глюков.

```
// ______________
// |\           |
// |  \         |
// |    \       |
// |      \     |
// |        \   |
// |          \ |
// |____________|
//    ^^^^^^^^   \
//    relative     \
//                   \
//                     ______________
//                     |            |
//                     |            |
//                     |            |
//                     |            |
//                     |            |
//                     |____________|
//                       ^^^^^^^^^^
//                        absolute
```

## Вывод адаптивной сетки

> Не указывая у обвязки `bottom` и `height` можно организовать вывод адаптивной сетки со скроллингом

Следующий код

```
<style>
  .root {
    position: relative;
    height: 100vh;
    width: 100vw;
  }
  .container {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .cell {
    margin: 5px;
    height: 50px;
    width: 50px;
    background: orange;
  }
</style>

<div class="root">
  <div class="container">
  
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  
  </div>
</div>
```

Осуществит вывод адаптивной сетки со скроллингом (ячейки прижаты к верху). Если ячейку растянуть по ширине, можно получить список карточек.

```
// ________________________________________________________
// |  __________  __________  __________  __________     |
// |  |        |  |        |  |        |  |        |     |
// |  |        |  |        |  |        |  |        |   | |
// |  |________|  |________|  |________|  |________|   | |
// |                                                   | |
// |  __________  __________  __________  __________   | |
// |  |        |  |        |  |        |  |        |   | |
// |  |        |  |        |  |        |  |        |     |
// |  |________|  |________|  |________|  |________|     |
// |                                                     |
// |  __________  __________                             |
// |  |        |  |        |                             |
// |  |        |  |        |                             |
// |_____________________________________________________|
```

**ВСЁ**. Остальное с практикой. 90% результата дается в 10% времени

## Верстка по макету

> Давайте сверстаем следующий макет на JSX

```
// ______________________________________________________
// |                                                    |
// |  MyAmazingApp                              GitHub  |
// |____________________________________________________|
// |                                                    |
// | 00000000000000000000000000000000000000000000000000 |
// | 00000000000000000000000000000000000000000000000000 |
// | 00000000000000000000000000000000000000000000000000 |
// | 00000000000000000000000000000000000000000000000000 |
// | 00000000000000000               000000000000000000 |
// | 00000000000000000    CONTENT    000000000000000000 |
// | 00000000000000000               000000000000000000 |
// | 00000000000000000000000000000000000000000000000000 |
// | 00000000000000000000000000000000000000000000000000 |
// | 00000000000000000000000000000000000000000000000000 |
// |____________________________________________________|
// |                                                    |
// |                       FOOTER                       |
// |____________________________________________________|
//
```

Код:

```
<div id="mount-point"></div>

<script src="https://theonekit.github.io/index.js"></script>

<style>
  html, body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
</style>

<script>
  (function () {

    const {
      createElement: h,
      Fragment
    } = React;

    const {
      Button: B,
      Typography: T,
    } = material.core;

    const rootStyle = {
      position: "relative",
      height: "100vh",
      width: "100vw",
    };

    const containerStyle = {
      position: "absolute",
      top: "0px",
      left: "0px",
      right: "0px",
      bottom: "0px",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "stretch",
      justifyContent: "stretch",
      flexDirection: "column",
    };

    const headerStyle = {
      maxHeight: "75px",
      flex: 1,
      display: "flex",
      alignItems: "center",
      padding: "10px",
      boxShadow: "0 1.5px 2px -2px grey"
    };

    const contentStyle = {
      flex: 1,
      backgroundColor: "whitesmoke",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };

    const footerStyle = {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      maxHeight: "60px",
    };

    const stretch = {
      style: {
        flex: 1,
      }
    };

    /**
     * Если нужен только render, класс можно не писать
     */
    const App = () => h(Fragment, null,
      h("div", { style: rootStyle },
        h("div", { style: containerStyle },
          h("div", { style: headerStyle },
            h(T, { variant: "h4" }, "MyAmazingApp"),
            h("div", stretch),
            h(B, null, "GitHub"),
          ),
          h("div", { style: contentStyle }, "CONTENT"),
          h("div", { style: footerStyle }, "FOOTER"),
        )
      )
    );

    const mountPoint = document.querySelector("#mount-point");
    ReactDOM.render(h(App), mountPoint);

  })();
</script>
```

## Как работает компонент `div`

Внутри div можно выводить другие компоненты

```
const App = () => (
  <div>
    <p>Hello, world!</p>
  </div>
);
```

Для вывода потомков существует специальное свойство `children`. Рассмотрим его использование на примере [fieldset](http://htmlbook.ru/html/fieldset)

```
<div id="mount-point"></div>

<script src="https://theonekit.github.io/index.js"></script>

<script>
	(function() {
  	
    const {
    	createElement: h,
    } = React;
    
    const {
    	Button
    } = material.core;
    
    const Hero = (props) => h('fieldset', null,
    	h('legend', null, props.title),
      props.children,
    );
    
    const App = () => h(Hero, {
    	title: "Кнопка Button в стиле Material"
    }, h(Button, {variant: "contained"}, 'Hello there'));
    
    const mountPoint = document.querySelector("#mount-point");
    ReactDOM.render(h(App), mountPoint);
    
  })();
</script>
```

## Самостоятельная работа

### Задача 1

> Сверстать на JSX разноцветную лесенку c flexbox-центровкой

```
//  _____________________________________________________
//  |        ___________________________________        |
//  |        |  _____________________________  |        |
//  |        |  |  _______________________  |  |        |
//  |        |  |  |  _________________  |  |  |        |
//  |        |  |  |  |               |  |  |  |        |
//  |        |  |  |  |               |  |  |  |        |
//  |        |  |  |  |               |  |  |  |        |
//  |        |  |  |  |               |  |  |  |        |
//  |        |  |  |  |               |  |  |  |        |
//  |        |  |  |  |_______________|  |  |  |        |
//  |        |  |  |  ^^^                |  |  |        |
//  |        |  |  |  div                |  |  |        |
//  |        |  |  |_____________________|  |  |        |
//  |        |  |  ^^^                      |  |        |
//  |        |  |  div                      |  |        |
//  |        |  |___________________________|  |        |
//  |        |  ^^^                            |        |
//  |        |  div                            |        |
//  |        |_________________________________|        |
//  |        ^^^                                        |
//  |        div                                        |
//  |___________________________________________________|
```

Подсказка

```
const App = () => (
  <Box>
    <Box>
      <Box>
        ...
      </Box>
    </Box>
  </Box>
);
```

### Задача 2

> Уметь повторить верстку с макета
