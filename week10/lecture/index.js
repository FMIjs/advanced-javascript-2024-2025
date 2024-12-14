const express = require('express');
const path = require('path');
const api = require('./api');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

const secret = 'shhhhh';

function auth(req, res, next) {
  const token = req.cookies['auth'];
  req.decoded = token ? jwt.verify(token, secret) : null;
  next();
}

function restrict(req, res, next) {
  if (!req.ddecoded) res.status(401).end();
  next();
}



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

// function bodyParser(req, res, next) {
//   if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
//     return void formParser(req).then(body => {
//       req.body = body;
//       next();
//     }).catch(err => next(err))
//   }
//   next();
// }

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/pages'));

app.use(express.static(path.resolve('static')));
function globalErrorHandler(err, req, res, next) {
  if (err.code === 'ENOENT')
    res.code(404).end();
  res.code(500).end();
}

app.use(cookieParser());
app.use(globalErrorHandler);
app.use(express.urlencoded());
app.use(express.json());

app.use(auth);

app.use('/api', restrict, api);


app.get('/', (req, res) => {
  const decoded = req.decoded || {};
  res.render('home', { user: decoded?.user });
})

app.get('/login', (req, res) => {
  res.render('login', { error: '' });
});

app.post('/login', (req, res) => {
  console.log(req.body);
  if (req.body.password.length < 3)
    return void res.render('login', { error: 'Password must be > 3' });

  const token = jwt.sign({ user: 'Ivan' }, secret);
  res.cookie('auth', token, { httpOnly: true });
  res.redirect('/');
});


app.listen(8080, function () {
  console.log('Server is listening on :8080');
});