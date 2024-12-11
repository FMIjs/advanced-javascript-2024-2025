const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { tasks } = require('./tasks');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/pages'));

app.use(express.static(path.resolve('static')));
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(express.static('public')); // Serve static files from the 'public' folder 

// Routes
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.post('/add-task', (req, res) => {
    const task = req.body.task;
    if (task) {
        tasks.push(task); 
    }
    res.redirect('/');
});


app.listen(8080, function () {
  console.log('Server is listening on :8080');
})