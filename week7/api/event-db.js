const _localDb = {
  events: new Map([
    ["1", { id :"1", title: "Event 1", date: "2021-10-01", capacity: 10 }],
    ["2", { id: "2", title: "Event 2", date: "2021-10-02", capacity: 20 }],
    ["3", { id: "3", title: "Event 3", date: "2021-10-03", capacity: 3 }],
    ["4", { id: "4", title: "Event 4", date: "2021-10-04", capacity: 30 }],
    ["5", { id: "5", title: "Event 5", date: "2021-10-05", capacity: 5 }],
  ]),
  bookings: new Map([
     [ "1", { id : "1", eventId : "3", firstName : "Pesho", lastName : "Ivanov" }], 
     [ "2", { id: "2", eventId : "3", firstName : "Gosho", lastName : "Petrov" }],
     [ "3", { id: "3", eventId : "3", firstName : "Ivan", lastName : "Ivanov" }],  
  ]),
};

function bookingsByEventIdFactory() {
  const bookingsByEventId = new Map();
  _localDb.bookings.forEach((booking) => {
    if (!bookingsByEventId.has(booking.eventId)) {
      bookingsByEventId.set(booking.eventId, []);
    }
    bookingsByEventId.get(booking.eventId).push(booking);
  });
  return bookingsByEventId;
}

module.exports = {
  events: _localDb.events,
  bookings: _localDb.bookings,
  getBookingsByEventId: bookingsByEventIdFactory, 
};
