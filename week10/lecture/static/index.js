const btn = document.getElementById('my-btn')
const input = document.getElementById('text-input');
const list = document.querySelector('#todo-list');

const todos = JSON.parse(readList() || '[]');

const api = 'http://localhost:8080/api'

function loadTodos() {
  return fetch(`${api}/todo`)
    .then(res => res.json().then(data => res.ok ? data : Promise.reject(data)))
    .catch(error => console.error(error))
}

function addTodo(text) {
  return fetch(`${api}/todo`, { method: 'post', body: JSON.stringify({ text }) })
    .then(res => res.json().then(data => res.ok ? data : Promise.reject(data)))
    .catch(error => console.error(error))
}

function deleteTodo(index) {
  return fetch(`${api}/todo/${index}`, { method: 'delete' })
    .then(res => res.json().then(data => res.ok ? data : Promise.reject(data)))
    .catch(error => console.error(error))
}


todos.forEach((todo, index) => {
  addTodo(todo, false, index);
})

function removeTodoListItem(liEl) {
  liEl.remove();
  saveList();
}

function createTodoListItem(text) {
  const liEl = document.createElement('li');
  liEl.textContent = text;
  const btn = document.createElement('button');
  btn.textContent = 'Remove';
  btn.addEventListener('click', () => removeTodoListItem(liEl));
  liEl.appendChild(btn);
  return liEl;
}

function addTodo(text, withSave, index) {
  const liEl = createTodoListItem(text);
  list.appendChild(liEl);

  if (!index) index = todos.push(text);
  liEl.setAttribute('data-todo-index', index);
  if (withSave) saveList();
}

function saveList() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function readList() {
  return localStorage.getItem('todos');
}

btn.addEventListener('click', function (event) {
  const inputValue = input.value;
  if (!inputValue) return;
  input.value = '';
  addTodo(inputValue, true);
});
