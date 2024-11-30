const { error } = require('console');
const express = require('express');
const path = require('path');


function formParser(readSteam) {
  let data = '';
  return new Promise(function (res, rej) {
    readSteam.on('data', function (chunk) {
      data += chunk.toString();
    });
    readSteam.on('err', function (err) {
      rej(err);
    })
    readSteam.on('end', function () {
      const parsedData = data.split('&').reduce((acc, curr) => {
        const [key, value] = curr.split('=');
        acc[key] = value;
        return acc;
      }, {});
      res(parsedData);
    });
  });
}

function bodyParser(req, res, next) {
  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    return void formParser(req).then(body => {
      req.body = body;
      next();
    }).catch(err => next(err))
  }
  next();
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/pages'));

app.use(express.static(path.resolve('static')));
function globalErrorHandler(err, req, res, next) {
  if (err.code === 'ENOENT')
    res.code(404).end();
  res.code(500).end();
}

app.use(globalErrorHandler);
app.use(bodyParser);


app.get('/', (req, res) => {
  res.render('home');
})

app.get('/login', (req, res) => {
  res.render('login', { error: '' });
});

app.post('/login', (req, res) => {
  console.log(req.body);
  if (req.body.password.length < 3)
    return void res.render('login', { error: 'Password must be > 3' });
  res.redirect('/');
});


app.listen(8080, function () {
  console.log('Server is listening on :8080');
})