function Person(name) {
  // this.name = name;
  // this.getName = function () {
  //   console.log(this.name);
  // }

  this.getName = function () {
    return name;
  };

  // this.getMyName = (function (a, b) {
  //   console.log(this.name, a, b);
  // }).bind(this);//, 5);

  // this.getMyName2 = (a, b) => {
  //   console.log(this.name, a, b);
  // };
}

Person.prototype.getName = function (a, b) {
  console.log(arguments);
  var args = Array.prototype.slice.call(arguments);

  console.log(this);
  console.log(this.name, a, b);
};

const iObj = new Person('Ivan');
const pObj = new Person('Petar');
pObj.getName = iObj.getName;

pObj.getName.call(iObj, 1, 2);
pObj.getName.apply(iObj, [1, 2]);

pObj.getMyName.call(iObj);
pObj.getMyName2(1, 1, 1);

const test1 = pObj.getMyName2;
const test2 = pObj.getMyName;
const test3 = pObj.getName;
test1();
test2();
test3();

function aaa() {
  test3();
}

aaa.call({});



