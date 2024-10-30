var args = [];

function curry(fn) {
  const arity = fn.length;
  return function helper() {
    args = args.concat(...arguments);
    if (args.length >= arity) {
      try {
        return fn.apply(undefined, args);
      } finally {
        args = [];
      }
    }
    return helper;
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

// Difference between the two solutions is in the way we can call it like that
const result11 = currySum(1, 2);
const result12 = currySum(3);

console.log(result11); // printing the function
console.log(result12);
