const api = 'http://localhost:8080/api'

function toggleLoader() {
  const loader = document.getElementById('loader');
  loader.classList.toggle('hidden');
}

function loadTodos() {
  toggleLoader();
  return fetch(`${api}/todo`, { credentials: 'include' })
    .then(res => res.json().then(data => res.ok ? data : Promise.reject(data)))
    .finally(() => {
      toggleLoader()
    })
    .catch(error => console.error(error))
}

function saveTodo(text) {
  toggleLoader()
  return fetch(`${api}/todo`, { method: 'post', body: JSON.stringify({ text }), headers: { 'Content-type': 'application/json' }, credentials: 'include' })
    .then(res => res.json().then(data => res.ok ? data : Promise.reject(data)))
    .finally(() => {
      toggleLoader()
    })
    .catch(error => console.error(error))

}

function deleteTodo(index) {
  toggleLoader()
  return fetch(`${api}/todo/${index}`, { method: 'delete', credentials: 'include' })
    .then(res => res.json().then(data => res.ok ? data : Promise.reject(data)))
    .finally(() => {
      toggleLoader()
    })
    .catch(error => console.error(error))
}

function app() {

  const btn = document.getElementById('my-btn')
  const input = document.getElementById('text-input');
  const list = document.querySelector('#todo-list');

  function removeTodoListItem(liEl) {
    const index = +liEl.getAttribute('data-todo-index');
    deleteTodo(index).then(() => {
      liEl.remove();
    })
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

  function addTodo(text, index) {
    const liEl = createTodoListItem(text);
    list.appendChild(liEl);

    liEl.setAttribute('data-todo-index', index);
  }


  loadTodos().then(todos => {
    todos.forEach((todo, index) => addTodo(todo, index))
  });

  btn.addEventListener('click', function (event) {
    const inputValue = input.value;
    if (!inputValue) return;
    input.value = '';
    saveTodo(inputValue).then(() => addTodo(inputValue));
  });
}

app();