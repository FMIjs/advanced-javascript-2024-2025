const PromiseStates = {
  PENDING: "PENDING",
  RUNNING: "RUNNING",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED",
};
const HandlerType = {
  THEN: "THEN",
  CATCH: "CATCH",
};

let tmpPromiseId = 0;

class MyPromise {
  id = 0;
  state = PromiseStates.PENDING;
  thenHandlerFn = () => {};
  catchHandlerFn = () => {};
  handlerFn = () => {};

  handlers = []; // { type: HandlerType, fn: Function }

  constructor(handlerFn) {
    this.id = tmpPromiseId++;
    this.handlerFn = handlerFn;
    setTimeout(() => this.run());
  }

  then(thenHandlerFn) {
    this.state = PromiseStates.PENDING;
    this.handlers.push({ type: HandlerType.THEN, fn: thenHandlerFn });

    return this;
  }

  catch(catchHandlerFn) {
    this.state = PromiseStates.PENDING;
    this.handlers.push({ type: HandlerType.CATCH, fn: catchHandlerFn });
    return this;
  }

  run() {
    this.state = PromiseStates.RUNNING;

    const resolve = (value) => {
      const handlerIdx = this.handlers.findIndex(
        (h) => h.type === HandlerType.THEN
      );
      if (handlerIdx === -1) return;
      const handler = this.handlers[handlerIdx];
      this.handlers = this.handlers.slice(handlerIdx + 1);
      this.state = PromiseStates.RESOLVED;
      const newValue = handler.fn(value);
      resolve(newValue);
    };

    const reject = (value) => {
      const handlerIdx = this.handlers.findIndex(
        (h) => h.type === HandlerType.CATCH
      );
      if (handlerIdx === -1) return;
      const handler = this.handlers[handlerIdx];
      this.handlers = this.handlers.slice(handlerIdx + 1);
      this.state = PromiseStates.REJECTED;
      const newValue = handler.fn(value);
      resolve(newValue);
    };

    this.handlerFn(resolve, reject);
  }
}

const promiseHandlerFn = (resolve, reject) => {
  console.log("Promise handler function");
  setTimeout(() => {
    // resolve("first value");
    reject("Failed");
  });
};

const myPromise = new MyPromise(promiseHandlerFn);

myPromise
  .then((value) => {
    console.log(1, value);
    // return false;
    // return "second value";
  })
  .catch((value) => {
    console.log("error", value);
    return "error value";
  })
  .then((value) => {
    console.log(2, value);
  });

// console.log(myPromise.state);

const realPromise = new Promise((resolve, reject) => {
  resolve("first value");
  // reject('my error');
});

// realPromise
//   .then(value => {
//     console.log(1, value);
//     return new Promise((res) => {
//       setTimeout(() => res('second value'), 2_000);
//     });
//   })
//   .then(value => {
//     console.log(2, value);
//     return new Promise((res, rej) => {
//       setTimeout(() => rej('third value'), 2_000);
//       // setTimeout(() => res('third value'), 2_000);
//     });
//   })
//   .then(value => {
//     console.log(3, value);
//     return new Promise((res) => {
//       setTimeout(() => res('fourth value'), 2_000);
//     });
//   })
//   .catch((err) => {
//     console.log('error', err);
//     return new Promise((res) => {
//       setTimeout(() => res('value after error'), 2_000);
//     })
//   })
//   .then((value) => {
//     console.log(4, value);
//   });

// const realPromise2 = new Promise((resolve, reject) => {
//   resolve();
// });
// realPromise2
//   .then((v) => {
//     console.log(1, v);
//   })
//   .then((v) => {
//     console.log(2, v);
//     return 2;
//   })
//   .then((v) => {
//     console.log(3, v);
//   });
