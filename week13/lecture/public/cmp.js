import { html, render } from 'https://esm.run/lit-html@1';
import { doSomething } from './utils.js';

class MyFirstComponent extends HTMLElement {

  static observedAttributes = ['data-id'];

  // @context()
  context = {
    counter: 0
  };

  handlers = {
    increment: () => {
      this.context.counter++;
      this.render(this.context, this.handlers)
    }
  };

  render = (context, handlers) => {
    const template = html`
      <div>${context.counter}</div>
      <button @click=${handlers.increment}>Increment</button>
    `;
    render(template, this.shadowRoot);
  };

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    doSomething();
    const template = document.getElementById('my-cmp-template');

    this.shadowRoot.addEventListener('click', function () {
      console.log('CLICK!');
    });

    this.render(this.context, this.handlers);
  }

  attributeChangedCallback(name, oldVal, newValue) {
    console.log(name, oldVal, newValue);
  }
}

customElements.define('my-cmp', MyFirstComponent);