# Урок 6

> Хуки useState, useEffect, useRef.

Почему описание техник работы с классами было столь сжато? На текущий момент классы нужны для обратной совместимости с существующим кодом. Новые компоненты в обязательном порядке пишутся на хуках.

## Фатальный недостаток классов

> Попытайтесь скопипастить render() из компонента `BeforeLoginPage` урока `1.4`. Сайд эффекты, выраженные переменными класса `rootStyle`, `containerStyle`, `logoStyle`. Гораздо проще закопипастить `Button`...

## Как работает event loop?

> В очередь поступило три команды. Одна из них асинхронная. Асинхронная выполнятся последней

Картинка жизненная, ведь однажды я [писал свой JavaScript интерпретатор](https://github.com/tripolskypetr/quite)

```
//                               |                               |                               |
//             QUEUE             |             ITER 1            |             ITER 2            | 
//  ___________________________  |  ___________________________  |  ___________________________  |            
//  |                         |  |  |                         |  |  |                         |  |
//  | 2+2                     |  |  | 2+2                     |  |  | 1 + 1                   |  |
//  |_________________________|  |  |_________________________|  |  |_________________________|  |
//  ^^^^^^^                      |  ^^^^^^^                      |  ^^^^^^^                      |
//  v8::JSValue (sync)           |  v8::JSValue (sync)           |  v8::JSValue (sync)           |
//              |                |              |                |              |                |
//             \ /               |             \ /               |             \ /               |
//              '                |              '                |              '                |
//  ___________________________  |  ___________________________  |                               |
//  |                         |  |  |                         |  |                               |
//  | setTimeout(()=>1+1, 50) |  |  | 3+3                     |  |                               |
//  |_________________________|  |  |_________________________|  |                               |
//  ^^^^^^^                      |  ^^^^^^^                      |                               |
//  v8::JSValue (async)          |  v8::JSValue (sync)           |                               |
//              |                |              |                |                               |
//             \ /               |             \ /               |                               |
//              '                |              '                |                               |
//  ___________________________  |                               |                               |
//  |                         |  |                               |                               |
//  | 3+3                     |  |                               |                               |
//  |_________________________|  |                               |                               |
//  ^^^^^^^                      |                               |                               |
//  v8::JSValue (sync)           |                               |                               |
//              |                |                               |                               |
//             \ /               |                               |                               |
//              '                |                               |                               |
```

## Давайте покурим марихуану...

> Чет мы все о программировании... Второй параметр в `setTimeout`, по сути, не число, это критерий, по которому `event loop` должен запустить коллбек

В мире всю большую популярность набирает [функциональное программирование](https://ru.wikipedia.org/wiki/Функциональное_программирование). Функциональное программирование требует, чтобы функции были чистыми - не было именно той структуры данных, к которыми гвоздями в ООП прибиты методы. Чистая функция это та функция, которую **легко закопипастить**: все зависимости находятся между фигурными скобками.

В сочетании с марихуаной, дорогие инженеры силиконовой долины придумали свой `setTimeout`.

## Как устроен `useEffect`...

> Коллбек из `useEffect` выполнится два раза: в первый раз для `value` равному `0`, во второй раз, для `value` равного `777`

```
<div id="mount-point"></div>

<script src="https://theonekit.github.io/index.js"></script>

<script type="text/babel">
	(function() {

    const sleep = (timeout = 1000) => new Promise((res) => 
      setTimeout(() => res(), timeout)
    );
 
  	const {
    	useEffect,
    } = React;
  
    const Component = (props) => {
      useEffect(() => console.log('VALUE CHANGED', props.value), [props.value, /* ... */]);
      //        ^^^^^^^^^^^^^^^^^^^^^                            ^^^^^^^^^^^^^
      //        Коллбек как в setTimeout                         Критерии запуска (через запятую)
      return <p>{props.value}</p>;
    };

    class App extends React.Component {
      state = {
        value: 0,
      }
      componentDidMount() {
        sleep().then(() => 
          this.setState({
            value: 777,
          })
        );
      }
      render() {
        return <Component value={this.state.value}/>
      }
    }
    
    ReactDOM.render(<App/>, document.querySelector('#mount-point'))

  })();
</script>
```

## Хук `useState`. Как выпилить `componentDidMount()`

> Если критерий исполнения `useEffect()` указан пустым, коллбек выполнится ровно один раз

```
const App = () => {
  const [value, setValue] = useState(0);
    useEffect(() => {
      sleep().then(() => 
        setValue(777)
      )
    }, []);
  return <Component value={value} />
};   
```

## Хук `useRef`. Хук `useCallback`

> Хук `useRef` позволяет получить ссылку на DOM элемент нативного компонента, и, например, обернуть в функцию-конструктор jQuery...

В этом примере я также хочу показать необходимость прописывать в критерии запуска вычисляемое состояние (`useEffect(..., [*rects*])`), так как его действительность не гарантируется. Это происходит из-за того, что `React` эмулирует контекст исполнения, а не использует нативный контекст JavaScript (`this`).

```
const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const createRect = () => ({
  color: getRandomColor(),
  text: getRandomString(),
});
const getRandomString = () => Math.random().toString(36).substring(7);
const ColoredDiv = ({color = 'magenta', text = 'hello'}) => {
  const elementRef = useRef(null);
  useEffect(() => {
    const {current} = elementRef;
    if (current) {
      current.style.color = color;
      current.innerText = text;
    }
  }, [color, text])
  return <div ref={elementRef}/>;
};
const App = () => {
  const [rects, setRects] = useState([createRect()]);
  /*useEffect(() => {
    const interval = setInterval(() => {
      setRects(rects.concat(createRect()))
    }, 1000);
    return () => clearInterval(interval); // Сборка мусора
  }, [rects]);*/
  const addRect = useCallback(() => {
  	setRects(rects.concat(createRect()))
  }, [rects]);
  return (
    <div onClick={addRect}>
      {rects.map((rect, index) => (
        <ColoredDiv color={rect.color}
          text={rect.text}
          key={index} />
      ))}
    </div>
  );
};   
```

Примечание: если вы всё же будете так делать, используйте `useLayoutEffect`...

## Самостоятельная работа

### Задача 1.

> Повторите инкрементальную игру из урока 2 без класса

### Задача 2.

> Сверстайте список геометрических фигур, используя `Array.prototype.map`
