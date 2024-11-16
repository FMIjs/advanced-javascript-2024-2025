const userRouter = require('express').Router();

const users = [{ id: 1, name: 'Test', age: 20 }, { id: 2, name: 'Test 2', age: 20 }];
const activities = [{ id: 1, userId: 1, title: '1' }, { id: 2, userId: 2, title: '1' }];
// CRUD

userRouter.post('/:id/activity', (req, res) => {
  const title = req.body.title;
  const userId = +req.params.id;
  const activityId = activities.length;
  const newActivity = { id: activityId, userId, title }
  activities.push(newActivity);
  res.send(newActivity);
});

userRouter.get('/:id/activity/:activityId', (req, res) => {
  const userId = +req.params.id;
  const activityId = +req.params.activityId;
  const userActivity = activities.find(a => a.userId = userId && a.id === activityId)
  res.send(userActivity);
});

userRouter.get('/:id/activity', (req, res) => {
  const userId = +req.params.id;
  const userActivities = activities.filter(a => a.userId = userId)
  res.send(userActivities);
});

userRouter.get('/', (req, res) => {
  res.send(users);
});

userRouter.get('/:id', (req, res) => {
  const user = users.find(u => u.id === +req.params.id);
  res.send(user);
});

userRouter.post('/', (req, res) => {
  const id = users.length;
  const name = req.body.name;
  const age = req.body.age;
  const newUser = { id, name, age };
  users.push(newUser);
  res.send(newUser);
});

userRouter.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === +req.params.id);
  const user = users[index];
  users.splice(index, 1);
  res.send(user);
});

userRouter.put('/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const age = req.body.age;
  const newUser = { id, name, age };
  const index = users.findIndex(u => u.id === +req.params.id);
  if (index === -1) {
    users.push(newUser);
  } else {
    users.splice(index, 1, newUser);
  }
  res.send(newUser);
});

userRouter.patch('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === +req.params.id);
  const user = users[index];
  if ("age" in req.body) {
    user.age = req.body.age;
  }
  if ("name" in req.body) {
    user.name = req.body.name;
  }
  res.send(user);
});

module.exports = userRouter;