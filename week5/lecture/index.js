const http = require('http');
const fs = require('fs');
// const Readable = require('stream').Readable;
// const Writable = require('stream').Writable;
const Transform = require('stream').Transform;

const sym1 = Symbol('test');
const sym2 = Symbol('test');

const sym3 = Symbol.for('TEST');

Object.getOwnPropertySymbols(obj);

const key = 'test';

const obj = {
  [sym1]: 1
};

for (const prop in obj) {
  console.log(prop);
}

obj.test = '123';


console.log(sym1 === sym2);

function* objectIterator() {
  const keys = Object.keys(this);
  for (const key of keys) {
    yield [key, this[key]];
  }
}

const server = http.createServer((req, res) => {
  const readableStream = fs.createReadStream('./text.txt', { highWaterMark: 1 });
  // const writeStream = fs.createWriteStream('./req-data.txt', { highWaterMark: 1 });
  const transform = new Transform({
    transform: (chunk, _, done) => {
      if (`${chunk}` === '\n')
        return void done(null, '<br/>');
      done(null, chunk);
    }
  })

  // req.pipe(writeStream);
  const headers = new Map();
  const test = {
    a: 1,
    [Symbol.iterator]: objectIterator
  };
  const b = [...test];
  console.log(b);
  headers.set('Content-type', 'text/html');
  const a = [...headers];
  console.log(a);
  res.setHeaders(headers);
  readableStream.pipe(transform).pipe(res);
});

server.listen(8080, () => {
  console.log('Server is listening on :8080');
});

// function test(...args) {
//   const [, , b, , a] = args;
// }

// function test1(_, __, ___, ____, a) {

// }
// test1(1, 1, 2, 3, 4);