# Упражнение 7

## 04.12.24

1. Напишете функция promisify, която взима един аргумент, който е асинхронна функция и връща Promise версията и.

    Пример:

    ```js
    const fs = require('fs');

    const promisify = () => { 
      // ...
    }

    const readFile = promisify(fs.readFile);
    const writeFile = promisify(fs.writeFile);

    readFile('./data.txt')
      .then(content => content + ' more data')
      .then(data => writeFile('./data.txt', data))
      .then(() => console.log('Operation completed!'));
    ```
1. Имплементирайте собствена реализация на Promise.