const fs = require('fs');


// const three = () => {

// }

// const two = (err, cont) => {
//   fs.writeFile('', three);
// }

// const one = (err, cont) => {
//   fs.readFile('', two);
// }

// let a;


// fs.readFile('./test.txt', one);


// [1].map(x => x + 1).map(x => x + 1).map().map();
// Promise.reject(1)
//   .then(x => x + 1)
//   .then(x => x + 1)
//   .then((x) => {
//     console.log(x);
//   })

// console.log(a);
// Pending
// Resolved 
// Rejected

function readFile(fileName) {
  return new Promise((res, rej) => {
    fs.readFile(fileName, { encoding: 'utf8' }, (err, content) => {
      if (err) return rej(err);
      res(content);
    })
  });
}

function writeFile(fileName, content) {
  return new Promise((res, rej) => {
    fs.writeFile(fileName, content, (err) => {
      if (err) return rej(err);
      res(content);
    });
  });
}

readFile('test.txt').then(
  (content) => {
    const updateContent = content + '23123232321321';
    const writeFilePromise = writeFile('output.txt', updateContent).catch(err => {
      console.error(err);
      return Promise.reject(err);
    });
    return Promise.all([writeFilePromise, content]);
  }
).then(([updatedContent, content]) => {
  if (updatedContent === '') { console.log('asda'); }
  console.log(`${updatedContent} was saved!`);
}).catch(err => {
  console.error(err);
}).finally(() => {

});

Promise.all([
  readFile('test.txt').catch(),
  readFile('test.txt').catch(),
  readFile('test.txt').catch(),
  readFile('test.txt').catch()
]).then(([file1, file2, file3, file4]) => {

});

async function main() {
  try {
    const content = await Promise.all([readFile('test.txt'), ...]);
  } catch (e) {
    console.error(e)
  } finally {
    console.log('Finally');
  }

}

