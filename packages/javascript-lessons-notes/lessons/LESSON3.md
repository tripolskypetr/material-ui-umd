# Урок 3

> Взаимодействие между файлами (`window`, `with() {}`). Пространства имен

## Оператор `with() { ... }`

> Экономия на `body.style`

```
<script>
let body;
/* Следующий код */
{ // <-- после window рассказать о том, что это замыкание
  body = document.querySelector('body');
  body.style.backgroundColor = 'green';
  body.style.height = '100vh';
  body.style.margin = '0';
  body.style.padding = '0';
  body.style.border = '25px solid yellow';
}
/* Эквивалентен этому */
{
  body = document.querySelector('body');
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

**Важно: ** весь код JavaScript скрыто запускается в `with(window) { ... }`

## Объект `window`

> Конструкция именуется `self calling function`. Это частный случай замыкания. Теперь она должна быть понятнее

```
(function(global) {
  global.fun = () => alert(123);
})(window); 
```

## Оператор И, ИЛИ

Оператор "И" проходит по логической цепочке и возвращает первое ложное в последовательности или последний элемент

```
> true && 1
1
> 0 && true
```

Оператор "ИЛИ" проходит по логической цепочке и возвращает первое истинное в последовательности или последний элемент

```
> 1 || 2
1
> 0 || false || 0
0
```

Это можно использовать для вывода значения по умолчанию (При пустом вводе `prompt()` возвращает `null`. `Boolean(null)` равен `false`)

```
const msg = prompt() || 'Не указано';
```

## Самостоятельная работа

### Задание 1

> FizzBuzz на максималках

 - Вывести числа от нуля до n, которые кратны И трем И пяти И десяти...
 - Вывести числа от нуля до n, которые кратны ИЛИ трем ИЛИ пяти ИЛИ десяти...

```
const fizzBuzz = (num, ignore = [3, 5, 10]) => {
  for (let i = 1; i <= num; i++) {
    let isOk = true;
    for (let j = 0; j !== ignore.length; j++) {
      isOk = isOk || i % ignore[j] === 0;
      //          ^^
      //          можно поменять на И
    }
    if (isOk) {
      console.log('fizzBuzz', i);
    }
  }
}
```

Решение в одну строчку

```
const createArr = (len) => [...new Array(len)].map((_, idx) => idx);
const fizzBuzz = (num, ignore = [3, 5, 10]) => createArr(num)
  .filter((i) => ignore.find((n) => i % n === 0));
```
