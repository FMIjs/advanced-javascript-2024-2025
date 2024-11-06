const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const serverErrorHandler = (err) => {
  console.error(err);
};

/** Exercise 1 */
const getRequestHandler = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const reqPath = parsedUrl.pathname;
  const match = reqPath.match(/^\/fetchTemplate\/(.+)$/);

  if (!match) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("GET request");
    res.end();
  } else {
    const templateName = match[1];
    if (templateName === "home") {
      fetchTemplateHandler(templateName, parsedUrl.query, res);
    }
  }
};

/** Exercise 2 */
const postRequestHandler = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const reqPath = parsedUrl.pathname;
  const match = reqPath.match(/^\/fetchTemplate\/(.+)$/);

  if (!match) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Not Found");
    res.end();
    return;
  } else {
    let bodyBuffer = "";
    let bodyParams = {};
    req.on("error", serverErrorHandler);
    req.on("data", function (chunk) {
      bodyBuffer += chunk.toString();
    });
    req.on("end", function () {
      bodyParams = JSON.parse(bodyBuffer);

      const templateName = match[1];
      if (templateName === "home") {
        fetchTemplateHandler(templateName, bodyParams, res);
      }
    });
  }
};

const replacePlaceholders = (template, replaceValues) => {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    return replaceValues[key] || match;
  });
};

const fetchTemplateHandler = (templateName, replaceValues, res) => {
  const filePath = path.join(__dirname, "templates", `${templateName}.txt`);

  fs.readFile(filePath, "utf8", (err, templateContent) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Template not found");
      return;
    }

    const filledTemplate = replacePlaceholders(templateContent, replaceValues);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(filledTemplate);
    res.end();
  });
};

/** HTTP server */
const server = http.createServer((req, res) => {
  const handler = {
    GET: getRequestHandler,
    POST: postRequestHandler,
  };

  handler[req.method](req, res);
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
