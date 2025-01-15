global.__basedir = __dirname;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const router = require('express').Router();
const appId = require('./config').appId;
const https = require('https');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/pages'));

app.use(express.static(path.resolve('static')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(express.static('public')); // Serve static files from the 'public' folder 


app.get('/', (_, res) => {
  res.render('index');
});

app.get('/weather', (req, res) => {
  const city = req.query['city'];
  if (!city) {
    throw new Error('City is required');
  }

  https.get(`https://api.openweathermap.org/data/2.5/weather?q=${req.query['city']}&appid=${appId}`, (weatherData) => {
    // ...
    weatherData.on('data', (data) => { 
      console.log(data.toString());
      // ...
    });
    weatherData.on('end', () => {
      // ...
    });
  })

});

app.get('*', (_, res) => res.status(404).send('PAGE NOT FOUND!'));

app.listen(3000, function () {
  console.log('Server is listening on :3000');
})