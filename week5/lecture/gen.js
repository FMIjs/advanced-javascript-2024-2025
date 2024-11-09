// iterator pattern
function iterator(data) {
  let i = 0;
  return {
    next: () => {
      return {
        completed: data.length - 1 <= i,
        value: data.length - 1 >= i ? data[i++] : null
      }
    },
  }
}

function* gen() {
  let i = 0;
  let cond = true
  while (cond) {
    cond = !(yield i++);
  }
}

const ii = gen();
console.log(ii.next());
console.log(ii.next());
console.log(ii.next());
console.log(ii.next());
console.log(ii.next(true));
console.log(ii.next());
console.log(ii.next());


const iter = iterator([1, 2, 3]);
console.log(iter.next()); // { value: 1; completed: false }
console.log(iter.next()); // { value: 2; completed: false }
console.log(iter.next()); // { value: 3; completed: true }
console.log(iter.next()); // { value: undefined; completed: true }


function simpleGenerator() {
  let i = 0
  return function () {
    return i++;
  };
}

const a = simpleGenerator();

console.log(a()); // 0
console.log(a()); // 1
console.log(a()); // 2
console.log(a()); // 3
console.log(a()); // 4