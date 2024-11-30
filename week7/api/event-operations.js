const {
  events,
  bookings,
  getBookingsByEventId
} = require("./event-db");

function getEvent(key) {
  return events.get(key);
}

function setEvent(key, value) {
  return events.set(key, value);
}

function deleteEvent(key) {
  return events.delete(key);
}

function getAllEvents() {
  return Array.from(events.values());
}

function generateId() {
  // We can also use a guid generator library here
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getBooking(key) {
  return bookings.get(key);
}

function createBookingForEvent(event, booking) {
  if (event.capacity === 0) {
    return { error: "No available seats" };
  }
  const { firstName, lastName } = booking;
  if (!firstName || !lastName) {
    return { error: "Invalid input" };
  }

  event.capacity -= 1;
  const id = generateId();
  bookings.set(id, { id, eventId : event.id, firstName, lastName });
  
  return { capacity: event.capacity };
}

function getBookingsForEvent(eventId) {
  return getBookingsByEventId().get(eventId) || [];
}

module.exports = {
  getEvent,
  setEvent,
  getAllEvents,
  generateId,
  deleteEvent,
  createBookingForEvent,
  getBooking,
  getBookingsForEvent
};
