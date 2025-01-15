/** 1. Поправете за да получите следният резултат
 * Expected output 
  Fetching data for item 1...
  Fetching data for item 2...
  Fetching data for item 3...
 */
function fetchData() {
  for (var i = 1; i <= 3; i++) {
    setTimeout(function () {
      console.log(`Fetching data for item ${i}...`);
    }, i * 1000);
  }
}

fetchData();

/** 2. Поправете за да получите следният резултат
 * Expected output 
  Starting task 1...
  Finished task 1
  Starting task 2...
  Finished task 2
  Starting task 3...
  Finished task 3
*/
async function processTasks() {
  for (var i = 1; i <= 3; i++) {
    setTimeout(async function () {
      console.log(`Starting task ${i}...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Finished task ${i}`);
    }, i * 500);
  }
}

processTasks();

/** 3. Моля обяснете защо е такава последователността на изпълнение и как точно се случва обработката 
Output : 
  Start
  End
  Async Start
  Promise 1
  Promise 2
  Async End
  Operation 1
  Operation 2
*/
console.log("Start");

setTimeout(() => {
  console.log("Operation 1");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("Promise 1");
    return Promise.resolve();
  })
  .then(() => {
    console.log("Promise 2");
  });

setTimeout(() => {
  console.log("Operation 2");
}, 0);

console.log("End");

(async function () {
  console.log("Async Start");
  await new Promise((resolve) => setTimeout(resolve, 0));
  console.log("Async End");
})();
