const _localDb = new Map([
  ["1", { title: "Event 1", date: "2021-10-01" }],
  ["2", { title: "Event 2", date: "2021-10-02" }],
  ["3", { title: "Event 3", date: "2021-10-03" }],
  ["4", { title: "Event 4", date: "2021-10-04" }],
  ["5", { title: "Event 5", date: "2021-10-05" }],
]);

function getEvent(key) {
  return _localDb.get(key);
}

function setEvent(key, value) {
  return _localDb.set(key, value);
}

function getAllEvents() {
  return Array.from(_localDb.values());
}

module.exports = { getEvent, setEvent, getAllEvents };
