import elements from './elementsDom.js';

export default function rendering(message1, message2) {
  const div = document.createElement('div');
  div.classList.add('card', 'border-0');
  div.innerHTML = `
  <div class="card-body">
      <h2 class="card-title h4">${message1}</h2>
  </div>
  <ul class="list-group border-0 rounded-0"></ul>`;
  elements.feeds.prepend(div);
  const div2 = document.createElement('div');
  div2.classList.add('card', 'border-0');
  div2.innerHTML = `
    <div class="card-body">
      <h2 class="card-title h4">${message2}</h2>
    </div>
    <ul class="list-group border-0 rounded-0"></ul>`;
  elements.posts.prepend(div2);
}
