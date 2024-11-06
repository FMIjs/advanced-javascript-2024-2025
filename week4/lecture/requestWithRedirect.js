const https = require('https');
const http = require('http');

function createRequestWithRedirect(transport) {
  return function requestWithRedirect(location, cb) {
    const request = transport.request(location, function (res) {
      let data = '';

      if (res.statusCode === 301) {
        return requestWithRedirect(res.headers.location, cb);
      }

      res.on('error', function (err) {
        cb(err);
      });
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        cb(null, data)
      })
    });
    request.end();
  }
}

const httpRequestWithRedirect = createRequestWithRedirect(http);
const httpsRequestWithRedirect = createRequestWithRedirect(https);

httpsRequestWithRedirect('https://google.bg', function (err, content) {
  if (err) return console.error(err);
  console.log(content);
});