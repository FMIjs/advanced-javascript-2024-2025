const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const { tasks } = require('./tasks');
const { login, tokenDecode, authenticate } = require('./auth');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/pages'));

app.use(express.static(path.resolve('static')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(express.static('public')); // Serve static files from the 'public' folder 

// Routes
app.get('/', tokenDecode, (req, res) => {
    res.render('index', { email : req.user ? req.user.email : '' });
});

app.post('/login', (req, res) => {
  login(req, res);
  res.redirect('/tasks');
});

app.get('/tasks', authenticate, (req, res) => {
  res.render('tasks', { tasks });
});

app.get('/task/add', authenticate, (req, res) => {
  res.render('add-new-task',);
});

app.post('/task/add', authenticate, (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task); 
    }
    res.redirect('/');
});

app.delete('/task', (req, res) => {
  const task = req.body.task;
  if (task) {
    const index = tasks.indexOf(task);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
  }
  res.status(200).send();
});

app.listen(8080, function () {
  console.log('Server is listening on :8080');
})