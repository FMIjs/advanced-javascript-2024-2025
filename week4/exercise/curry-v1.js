var args = [];

function curry(fn) {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) {
      return fn.apply(undefined, args);
    } else {
      return function (...args2) {
        return curried.apply(undefined, args.concat(args2));
      };
    }
  };
}

function tripleSum(a, b, c) {
  return a + b + c;
}

const currySum = curry(tripleSum);

const result1 = currySum(1)(2)(3);
const result2 = currySum(1, 2)(3);

console.log(result1);
console.log(result2);

const result3 = currySum(3)(5)(8);
const result4 = currySum(3)(5, 8);

console.log(result3);
console.log(result4);

// Advanced calling - not working :D
const result11 = currySum(1, 2);
const result12 = currySum(3);

console.log(result11);
console.log(result12);
