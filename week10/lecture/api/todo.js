const router = require('express').Router();

const todos = [];

router.get('/', (req, res) => {
  res.send(todos);
});

router.post('/', (req, res) => {
  const todo = req.body.text;
  todos.push(todo);
  res.send({ todo });
});

router.delete('/:idx', (req, res) => {
  const { idx } = req.params;
  const todo = todos[idx];
  todos.splice(idx, 1);
  res.send({ todo });
})

module.exports = router;