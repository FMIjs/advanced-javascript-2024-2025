const http = require("http");
const https = require("https");
const url = require("url");
const fs = require("fs");
const path = require("path");

const serverErrorHandler = (err) => {
  console.error(err);
};

/** Exercise 1, 4, 5 */
const getRequestHandler = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const reqPath = parsedUrl.pathname;
  const matchFetchTemplate = reqPath.match(/^\/fetchTemplate\/(.+)$/); // Example URL : http://localhost:3000/fetchTemplate/home?name=John%20Doe
  const matchLoadProp = reqPath.match(/^\/loadProp\/(.+)$/); // Example URL : http://localhost:3000/loadProp/name
  const matchStorePosts = reqPath.match(/^\/storeUserPosts\/(\d+)$/); // Example URL : http://localhost:3000/storeUserPosts/1

  if (matchFetchTemplate) {
    /** Exercise 1 */
    const templateName = matchFetchTemplate[1];
    if (templateName === "home") {
      fetchTemplateHandler(templateName, parsedUrl.query, res);
    }
  } else if (matchLoadProp) {
    /** Exercise 4 */
    const propName = matchLoadProp[1];
    loadPropHandler(propName, res);
  } else if (matchStorePosts) {
    /** Exercise 5 */
    const userId = matchStorePosts[1];

    fetchUserPosts(res, userId, savePostsToFile);
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("GET request");
    res.end();
  }
};

/** Exercise 2 & 3 */
const postRequestHandler = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const reqPath = parsedUrl.pathname;
  const matchFetchTemplate = reqPath.match(/^\/fetchTemplate\/(.+)$/); // Example URL : http://localhost:3000/fetchTemplate/home
  const matchFetchWebsite = reqPath.match(/^\/fetchWebsite\/(.+)$/); // Example URL : http://localhost:3000/fetchWebsite/reddit OR http://localhost:3000/fetchWebsite/www.reddit.com/.rss

  if (!matchFetchTemplate && !matchFetchWebsite) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Not Found");
    res.end();
    return;
  } else if (matchFetchTemplate) {
    /** Exercise 2 */
    let bodyBuffer = "";
    let bodyParams = {};
    req.on("error", serverErrorHandler);
    req.on("data", function (chunk) {
      bodyBuffer += chunk.toString();
    });
    req.on("end", function () {
      bodyParams = JSON.parse(bodyBuffer);

      const templateName = matchFetchTemplate[1];
      if (templateName === "home") {
        fetchTemplateHandler(templateName, bodyParams, res);
      }
    });
  } else if (matchFetchWebsite) {
    /** Exercise 3 */
    const websiteName = matchFetchWebsite[1];
    const isFullUrl = websiteName.includes("www");
    const fullUrl = isFullUrl
      ? `https://${websiteName}`
      : `https://www.${websiteName}.com`;
    https.get(fullUrl, (response) => {
      let body = "";
      response.on("error", serverErrorHandler);
      response.on("data", (chunk) => {
        body += chunk.toString();
      });
      response.on("end", () => {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(body);
        res.end();
      });
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

const props = {
  name: "John Doe",
  age: "30",
  city: "New York",
};
const loadPropHandler = (propName, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  Object.keys(props).includes(propName)
    ? res.write(props[propName])
    : res.write("Property not found");

  res.end();
};

const fetchUserPosts = (res, userId, callback) => {
  const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  https
    .get(url, (usersResponse) => {
      let data = "";

      usersResponse.on("data", (chunk) => {
        data += chunk;
      });

      usersResponse.on("end", () => {
        try {
          const posts = JSON.parse(data);
          callback(res, null, posts, userId);
        } catch (error) {
          callback(res, error);
        }
      });
    })
    .on("error", (err) => {
      callback(err);
    });
};

const savePostsToFile = (res, err, posts, userId) => {
  if (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error fetching user posts");
    return;
  }

  const dir = path.join(__dirname, "data");
  const filePath = path.join(dir, `${userId}.txt`);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const content = posts
    .map((post) => `Title: ${post.title}\nBody: ${post.body}\n`)
    .join("\n---\n");
  fs.writeFileSync(filePath, content, "utf8");

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`Posts for user ${userId} have been saved to /data/${userId}.txt`);
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
