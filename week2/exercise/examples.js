console.log(true + false);
console.log(null + 0);
console.log(!!"");
console.log("1" + "0");
console.log("1" - "0");

// ---- //
let pesho = {
  name: "Pesho",
  age: 22,
};
console.log("Object", pesho);
console.log("Object !!", !!pesho); // TRUE
pesho = {};
console.log("Empty object !!", !!pesho); // ALSO TRUE
console.log("Empty object !", !pesho);
if (pesho) {
  console.log("Empty object if");
}
if (pesho === true) {
  console.log("Empty object if true");
}
console.log("Empty object !", !pesho);
pesho = undefined;
console.log("Undefined", !!pesho);
pesho = null;
console.log("Null", !!pesho);

// ---- //
var person1 = {
  firstName: "Alice",
  greet: function (greeting, punctuation) {
    console.log(greeting + ", " + this.firstName + punctuation);
  },
};

var person2 = {
  name: "Bob",
};

var secondFunction = function (greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
};

secondFunction.apply(person2, ["Hello", "!"]); // Output: "Hello, Bob!"
secondFunction({ name: "Pesho" }, ["Hello", "!"]); // Output: "Hello, !"

// ---- //
const operator = "+";
const a = 5;
const b = 3;
const func = new Function("a", "b", `return a ${operator} b;`);
const result = func(a, b);
console.log(result);

// ---- //
function x(...args) {
  console.log(args);
}
x(1);
x(1, 2);
x(1, 2, 3);
