Handlebars.registerPartial(
  "header",
  `<nav>
    <a href="/" class="{{#if (eq active 'home')}}active{{/if}}">Home</a>
    <a href="/about" class="{{#if (eq active 'about')}}active{{/if}}">About</a>
  </nav>`
);

Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

function html(staticValues, ...dynamicValues) {
  console.log(staticValues, dynamicValues);
}

renTemplate = (cond) => html`
  <div>This is static string</div>
  <div>This contains dynamic value ${cond ? '1' : '2'}</div>
`
renTemplate(true)


const homePageHtml = `
  {{>header active="home"}}
  <div>Home page</div>
`;

const aboutPageHtml = `
  {{>header active="about"}}
  <div>About page</div>
`;

const notFoundPageHtml = `
  {{>header}}
  <div>404 page not found!</div>
`

const pageMap = {
  '/': homePageHtml,
  '/about': aboutPageHtml
}

function render(path) {
  const pageHTML = pageMap[path] || notFoundPageHtml;
  const pageTemplate = Handlebars.compile(pageHTML);
  document.body.innerHTML = pageTemplate();

  function navigationHandler(e) {
    e.preventDefault();
    const url = new URL(e.target.href);
    render(url.pathname);
    history.pushState(null, null, url);
  }

  document.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', navigationHandler);
  });
}

render(location.pathname);
window.addEventListener('popstate', function (e) {
  e.preventDefault();
  render(location.pathname);
});

// const homePageTemplate = 

// const aboutPageTemplate = Handlebars.compile();
