// setTimeout(function () {
//   console.log('HELLO!');
// }, 10000);

// function test() {
//   best();
// }

// function best() {
//   console.log('TEST');
// }

// test();

// for (var i = 0; i < 5; i++) {
// function helper(t) {
//   return function () {
//     console.log(t);
//   }
// }
// function helper(t) {
//   console.log(t);
// }
// setTimeout(helper.bind(undefined, i), 1000);
// const t = setTimeout(function (a) { console.log(a) }, 1000, i)
// clearTimeout(t);
// setInterval()
// clearInterval()

setTimeout(() => {
  console.log(2)
}, 0);

setTimeout(() => {
  console.log(2)
}, 0);

queueMicrotask(() => {
  console.log(1);
});

process.nextTick(function () {
  console.log('Next tick');
})

console.log(0);
// setTimeout(() => {
//   console.log(3)
// }, 0);


// }