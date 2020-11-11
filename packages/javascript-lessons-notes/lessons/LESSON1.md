# Урок 1

> Простые и сложные типы данных. Объект. Передача аргументов по ссылке

## Синтаксический сахар

> Следующие синтаксические конструкции попарно эквивалентны

```
const obj1 = new Object()
const obj2 = {}

const arr1 = new Array()
const arr2 = []
```

## Передача аргумента по ссылке

> По непонятной причине оригинальный массив изменился

```
const arr = [1, 2, 3]
const iter = (arr) => {
  for (let i = 0; i !== arr.length; i++) {
    arr[i] = arr[i] + 1;
  }
  return arr;
}
console.log(iter(arr))
console.log(arr)
```

Причина

```
const obj1 = new Object()
const obj2 = obj1;
obj1.foo = 'bar'
console.log(obj2)
```

НО!

```
function inc(v) { v = v + 1 }
const a = 1;
const b = 1;
b++ // b = b + 1
console.log(a) // 1
inc(a)
console.log(a) // 1
```

**Важно:** строки, числа и boolean не изменяемы - всегда передаются копией

## Домашнее задание

> Для самостоятельного написания

### Задание 1

> Написать функцию, удаляющую все двойные пробелы из строчки, вызывая "".replace() до тех пор, пока длинна новой строки не будет равна строке после замены. P.S. "".replace() заменяет только первое включение строки-шаблона

```
const line = "Hello   my  amazing word";

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

console.log(replaceAll(line, "  ", " "))
```

### Задание 2

> Палиндром

```
function isPoly(word) {
  const reversed = [];
  for (let i = word.length; i !== 0; i--) {
    const index = i - 1;
    reversed.push(word[index]);
  }
  return word === reversed.join('');
};
```
