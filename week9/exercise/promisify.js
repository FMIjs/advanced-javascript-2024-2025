import { readFile as _readFile, writeFile as _writeFile } from "fs";

function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
}

const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);

readFile("./data.txt")
  .catch((err) => {
    if (err.code === "ENOENT") {
      return "";
    }
    console.error(err);
    return Promise.reject(err);
  })
  .then((content) => `${content} more data`)
  .then((content) => writeFile("./data.txt", content));
