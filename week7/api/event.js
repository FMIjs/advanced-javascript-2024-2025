const {
  getAllEvents,
  generateId,
  setEvent,
  getEvent,
  deleteEvent,
  createBookingForEvent,
  getBookingsForEvent
} = require("./event-operations");

const eventRouter = require("express").Router();

eventRouter.get("/", (req, res) => {
  const events = getAllEvents();
  console.log(events);
  res.json(events);
});

eventRouter.post("/", (req, res) => {
  const { name, capacity } = req.body;

  // Validate input should be a configurable middleware not inlined
  if (!name || !capacity || typeof capacity !== "number" || capacity <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const id = generateId();
  const events = setEvent(id, { id, name, capacity, availableSeats: capacity });

  res.status(201).json(events.get(id));
});

eventRouter.get("/html1", (req, res) => {
  res.send("<h1>HTML1</h1>");
});

eventRouter.get("/html2", (req, res) => {
  res.send("<h1>HTML2</h1>");
});

eventRouter.get("/:id", (req, res) => {
  const event = getEvent(req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json(event);
});

eventRouter.delete("/:id", (req, res) => {
  const event = getEvent(req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  const success = deleteEvent(req.params.id);
  if (!success) {
    return res.status(500).json({ error: "Failed to delete event" });
  }
  res.status(204).send();
});

eventRouter.post("/:id/booking", (req, res) => {
  const event = getEvent(req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  const { firstName, lastName } = req.body;
  if (!firstName || !lastName) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const { capacity, error } = createBookingForEvent(event, { firstName, lastName });
  if (error) {
    return res.status(400).json({ error });
  }
  res.json({ capacity });
});

eventRouter.get("/:id/booking", (req, res) => {
  const event = getEvent(req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  const bookings = getBookingsForEvent(req.params.id);
  res.json(bookings);
});

module.exports = eventRouter;
