const PORT = 3000;

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Started Working, Express");
});

const apiRouter = require("express").Router();
apiRouter.get("/", (req, res) => {
  res.send("Just API");
});

apiRouter.post("/", (req, res) => {
  console.log(req.body);
});

app.use(express.json());
app.use("/api", apiRouter);

const eventRouter = require("./event");
app.use("/event", eventRouter);

app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});
