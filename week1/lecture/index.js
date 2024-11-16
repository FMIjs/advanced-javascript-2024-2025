// // ES5
// // ES6 (let, const)
// // HOISTING

// // let a = 0;

// // a = a + 1;

// // const a = [1, 2, 3, 4];
// // a.push(1000);
// // console.log(a);

// // function test2() {
// //   console.log(a);
// //   let a = 10;
// // }

// // console.log(test)
// // if (true) {
// //   var test = '13';
// // }

// // {
// //   console.log(a);

// //   let a;

// // }

// // // console.log(a);

// // // var testSomething = "dsadsa";
// // // var test = ['1', '2', '4', '5'];

// // // function test() {
// // //   console.log(1);
// // // }

// // // var a = '';


// // // for (let i = 0; i < 10; i++) {
// // //   a += test[i];
// // // }


// // // null
// // // undefined
// // // NaN
// // // 0
// // // ''
// // // false



// function doSomething(arr) {
//   arr.push(1);
//   return arr;
// }

// let a = [1, 2, 3];
// let b = doSomething(a.slice());
// console.log(a, b);

let obj = {
  prop1: '',
  prop2: {
    prop3: 1,
  }
};

// let obj2 = {
//   0: 1,
//   1: 2,
//   2: 3
// };

// console.log(obj2['0']);

// const str = new String('dsadas');

// const t = 'aaaaaa'.slice(0, 1);

console.log('1'.charCodeAt(0))


let a = new WeakMap();
a.set({}, 1);

const set = new Set(1, 1, 1, 2);

function test() {
  return function () {
    return function () {
      return function () {
        return function () {

        }
      }
    }
  }
}

test()()()()();

(function () {
  var a = 1;
  return ...;
})();