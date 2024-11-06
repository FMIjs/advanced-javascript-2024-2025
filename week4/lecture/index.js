const { studentReader } = require('./readers');

studentReader.on('data', function (data) {
  console.log(data);
});

studentReader.on('error', function (error) {
  console.log(error);
});

setTimeout(() => {
  studentReader.read();
}, 1000)