let obj = {};
console.log(obj.__proto__ === Object.prototype); // true

function f(a, b, c) {
  console.log(a, b, c);
}

f(1, 2, 3);

// constructor function
function Person(name) {
  this.name = name;
}

function Animal(name) {
  // no this context :
  // this.some = "prop";
  // return {
  //   name: name,
  // };

  this.name = name;
  return this;
}

Animal.prototype.bark = function () {
  console.log("Bark");
};

const canPrint = {
  print: function () {
    console.log("Printing");
  },
};

let dog = new Animal("Rex");
dog.bark();

let dog2 = Animal("Roxy");

let cat = Object.create(Animal.prototype);

// Diagrams :
// https://i.sstatic.net/HvzDP.png
// https://miro.medium.com/v2/resize:fit:1400/1*KNCFqc7YytARCUXJGgYn1Q.png

function ConstructEmpty() {
  return this;
}

const empty = Object.create(ConstructEmpty);
const emptyPrototype = Object.create(Construct.prototype);

/* ------ */
function Construct(name, age) {
  this.name = name;
  this.age = age;
  return this;
}

const pesho = new Construct("pesho", 20);
const peshoWithMistake = Construct("pesho", 20);
console.log(pesho);
console.log(peshoWithMistake);

/* ------ */
const TalkingPerson = function () {
  return {
    talk: function () {
      console.log("Hellooo");
    },
    age: 10,
  };
};

const person1 = TalkingPerson();
person1.talk();
