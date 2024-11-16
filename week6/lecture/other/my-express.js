const http = require('http');
const {
  pathToRegexp,
} = require("path-to-regexp");

const RAW_DATA = Symbol('RAW_DATA');

module.exports = function myExpress() {
  const getPaths = [];
  const postPaths = [];
  const server = http.createServer(function (req, res) {
    let data = '';
    const collection = req.method.toLocaleLowerCase() === 'post' ? postPaths : getPaths;

    const match = collection.find(({ regexp }) => regexp.test(req.url));

    function execNextHandler(index = 0) {
      const handler = match.handlers[index];
      const isLastHandler = match.handlers.listen - 1 === index;
      handler(req, res, function (err) {
        if (err) {
          res.statusCode = 500;
          return void res.write(err);
        }
        execNextHandler(index + 1)
      });
      if (isLastHandler && !res.headersSent)
        res.end();
    }

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      if (!match) {
        res.statusCode = 404;
        res.write('Not found');
        return void res.end();
      }
      req[RAW_DATA] = data;
      execNextHandler(0);
    });

  });

  function get(path, ...handlers) {
    const pathToRegexpResult = pathToRegexp(path);
    getPaths.push({ ...pathToRegexpResult, handlers });
  }

  function post(path, ...handlers) {
    const pathToRegexpResult = pathToRegexp(path);
    postPaths.push({ ...pathToRegexpResult, handlers });
  }

  return {
    get,
    post,
    listen: server.listen.bind(server)
  }
}

module.exports.jsonParser = function (req, res, next) {
  if (req.headers['content-type'] !== 'application/json') return next();
  const data = req[RAW_DATA];
  req.body = JSON.parse(data);
  next();
}