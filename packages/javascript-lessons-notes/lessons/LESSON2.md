# Урок 2

> Замыкания. Рекурсия. Map (higher-order function)

## Напишем tick-tack-toe

> Упражнение `tick-tack-toe` - классика жанра логического ветвления

```
let last = 'tick'

const ticTackToe = () => {
  if (last === 'tick') {
    last = 'tack';
  } else if (last === 'tack') {
    last = 'toe';
  } else if (last === 'toe') {
    last = 'tick';
  }
  console.log(last);
}

ticTackToe()
ticTackToe()
ticTackToe()
```

## Замыкание

> Переменная `last` в глобальном скоупе может сломать программу

```
const createTicTackToe = () => {
  let last = 'tick'
  return () => {
    if (last === 'tick') {
      last = 'tack';
    } else if (last === 'tack') {
      last = 'toe';
    } else if (last === 'toe') {
      last = 'tick';
    }
    console.log(last);
  }
}
```

## Рекурсия

> Реализуем сложение функцией, не используя соответствующий оператор

```
function add(cur, val) {
  if (val === 0) {
    return cur;
  } else {
    return add(++cur, --val);
  }
}

add(5, 3)
```

**Важно: ** `++v` вернет уже увеличенное v, а `v++` вернет v, а затем увеличит

## Функция `map`

> Классика ныне популярного функционального программирования

Следующая запись

```
const map = (arr, fun) => {
  const result = [];
  for (let i = 0; i !== arr.length; i++) {
    result.push(fun(arr[i]));
  }
  return result;
}
map([1,2,3], (v) => v + 1) // [2, 3, 4]
```

Эквивалентна

```
[1,2,3].map((v) => v + 1)
```

## Домашнее задание

> Самостоятельная работа

## Задание 1

> Создайте копию матрицы, увеличив каждый элемент на 1.

```
const mat = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
];
const copy = [];
for (let i = 0; i !== mat.length; i++) {
  copy.push([])
  for (let j = 0; j !== mat[i].length; j++) {
    copy[i].push(mat[i][j] + 1)
  }
}
copy
```

> Тоже самое в функциональном стиле

```
mat.map((line) => line.map((v) => v + 1))
```