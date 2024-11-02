const fs = require('fs');
function MyEventEmitter() {
  this.subscriptions = {};
}

MyEventEmitter.prototype.on = function (eventName, callback) {
  this.subscriptions[eventName] = (this.subscriptions[eventName] || [])
    .concat(callback);
};

MyEventEmitter.prototype.emit = function (eventName, data) {
  (this.subscriptions[eventName] || []).forEach(cb => cb(data));
};

// class MyEventEmitter {
//   subscriptions = {};
//   on(eventName, callback) {
//     this.subscriptions[eventName] = (this.subscriptions[eventName] || [])
//       .concat(callback);
//   };
//   emit(eventName, data) {
//     (this.subscriptions[eventName] || []).forEach(cb => cb(data));
//   };
// }

function Reader(fileName) {
  MyEventEmitter.call(this);
  this.read = () => {
    fs.readFile(fileName, (err, data) => {
      if (err) return this.emit('error', err);
      this.emit('data', data);
    });
  }
}

Reader.prototype = Object.create(MyEventEmitter.prototype);


// class Reader extends MyEventEmitter {
//   constructor(fileName) {
//     super();
//     this.read = () => {
//       fs.readFile(fileName, (err, data) => {
//         if (err) return this.emit('error', err);
//         this.emit('data', data);
//       });
//     }
//   }

// };

const studentReader = new Reader('students.txt');

module.exports.studentReader = studentReader;

// const source = new MyEventEmitter();


// source.on('someEvent', function handler(data) {
//   console.log(data);
// });

// source.on('someEvent', function handler(data) {
//   console.log(data);
// });


// source.emit('someEvent', { data: 1122 });