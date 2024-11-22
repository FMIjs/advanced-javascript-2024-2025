function* sampleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const sg = sampleGenerator();
console.log(sg.next());
console.log(sg.next());
console.log(sg.next());
console.log(sg.next());
console.log(sg.next());

for (const n of sampleGenerator()) {
  console.log(n);
}

const someObject = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  },
};

for (const n of someObject) {
  console.log(n);
}
