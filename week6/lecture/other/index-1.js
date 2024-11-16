// const http = require('http');
const myExpress = require('./my-express');
const PORT = 8080;
const app = myExpress();

function myMiddleware(req, res, next) {
  console.log('My Middleware');
  next();
}

app.post('/', myExpress.jsonParser, function (req, res) {
  console.log(req.body);
  // res.end();
});

app.get('/', function (req, res) {
  res.write('HELLO WORLD');
});


app.listen(PORT, function () {
  console.log(`Server is working on :${PORT}`);
});




// const server = http.createServer(function (req, res) {
//   let data = '';

//   req.on('data', (chunk) => {
//     data += chunk;
//   });
//   req.on('end', () => {
//     console.log(data);
//   });

// });

// server.listen(PORT, function () {
//   console.log(`Server is working on :${PORT}`);
// })