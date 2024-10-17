function memoize(fn) {
  const NOT_FOUND = Symbol("NOT_FOUND"); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
  const cache = {
    arguments: [],
    results: [],
    findPrecalculatedResultForArguments: function (searchArguments) {
      var argumentsMatch = this.arguments.find(function findHandler(
        currentArguments
      ) {
        var orderedSearchArguments = [...searchArguments].sort();
        for (var key in currentArguments) {
          if (orderedSearchArguments[key] !== currentArguments[key]) {
            return false;
          }
        }
        return true;
      });
      var index = this.arguments.indexOf(argumentsMatch);
      if (index === -1) {
        return NOT_FOUND;
      }
      return this.results[index];
    },
    saveResult: function (arguments, result) {
      this.arguments.push([...arguments].sort());
      this.results.push(result);
    },
  };
  return function () {
    var cacheResult = cache.findPrecalculatedResultForArguments(arguments);
    if (cacheResult !== NOT_FOUND) {
      return cacheResult;
    }

    var result = fn.apply(undefined, arguments);
    cache.saveResult(arguments, result);
    return result;
  };
}

function sum(a, b, c) {
  return a + b + c;
}
var memoSum = memoize(sum);

var res1 = memoSum(1, 2, 3);
var res2 = memoSum(2, 3, 1);
var res3 = memoSum(1, 2, 3);
console.log(res1, res2, res3);

function sumOfThreeValues(a, b, c) {
  return a.value + b.value + c.value;
}
var memoSumOfThree = memoize(sumOfThreeValues);

var arg1 = { value: 1 };
var arg2 = { value: 2 };
var arg3 = { value: 3 };

var complexRes1 = memoSumOfThree(arg1, arg2, arg3);
var complexRes2 = memoSumOfThree(arg2, arg1, arg2);
var complexRes3 = memoSumOfThree(arg1, arg2, arg3);
console.log(complexRes1, complexRes2, complexRes3);
