const http = require('http');

const messages = ['HELLO', "WORLD", "FROM", "NODE"];

const obj = { user: { name: ['ivan', 'ivanov'] } };
const { user: { name: [firstName, lastName] } } = obj;

function asyncInter(array, fn, delay) {
  setTimeout(() => {
    // const item = array[0];
    // fn(item);
    // const rest = array.slice(1);
    const [item, ...rest] = array;
    if (item);
    if (rest.length === 0) return fn(null);
    asyncInter(rest, fn, delay);
  }, delay);
}

const server = http.createServer(function (req, res) {
  asyncInter(messages, function (item) {
    if (item === null) return res.end();
    res.write(item);
  }, 3000);
});

server.listen(8080, function () {
  console.log('Server is listening on port :8080');
});

// const fs = require('fs');

// const testTxtContent = fs.readFileSync('./test.txt', { encoding: 'utf-8' });

// console.log(testTxtContent);

// fs.readFile('./test.txt', { encoding: 'utf-8' }, function (err, data) {
//   console.log('Data from read file: ', data);
// });

// console.log('End of script');

