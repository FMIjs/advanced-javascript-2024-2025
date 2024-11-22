const { getAllEvents } = require("./event-db");

const eventRouter = require("express").Router();

eventRouter.get("/", (req, res) => {
  const events = getAllEvents();
  console.log(events);
  res.send(events);
});

module.exports = eventRouter;
