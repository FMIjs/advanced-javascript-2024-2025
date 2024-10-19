class Shape {
  draw() {
    throw new Error("Method 'draw()' must be implemented.");
  }

  area() {
    throw new Error("Method 'area()' must be implemented.");
  }

  roll() {
    console.log("Rolling...");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  draw() {
    console.log("Drawing Circle");
  }

  area() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  draw() {
    console.log("Drawing Rectangle");
  }

  area() {
    return this.width * this.height;
  }
}

const shapes = [new Circle(5.0), new Rectangle(4.0, 6.0)];

Circle.prototype.roll = function () {
  console.log("rolling in the Circle proto");
};

shapes[0].roll();
shapes[1].roll();

shapes.forEach((shape) => {
  shape.draw();
  console.log("Area:", shape.area());
});

const drawFunc = function () {
  console.log("Drawing point at: ", this.x, this.y);
};

let point1 = {
  x: 10,
  y: 20,
  draw: drawFunc,
};

let point2 = {
  x: 10,
  y: 20,
  draw: drawFunc,
};

point1.draw();

/* Not good */
let objects = Array();
function myFunc() {
  console.log("Hello from function");
}

for (let n = 0; n < 10; n++) {
  objects[n] = {
    f: myFunc,
  };
}
