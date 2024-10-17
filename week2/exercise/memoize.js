// ---- //

function memoize(func) {
  var cache = {};
  return function () {
    var key = JSON.stringify(arguments);
    var result = cache[key];
    if (!result) {
      result = func.apply({}, arguments);
      cache[key] = result;
    }
    return result;
  };
}

const sum = function (x, y) {
  return x + y;
};

const memSum = memoize(sum);
console.log(memSum(2, 3));
console.log(memSum(3, 3));
console.log(memSum(2, 3));
