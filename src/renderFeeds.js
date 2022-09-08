import elements from './elementsDom.js';

export default function renderPostAndFeeds(state, i18nextInstance) {
  elements.feeds.innerHTML = '';
  const div = document.createElement('div');
  div.classList.add('card', 'border-0');
  div.innerHTML = `
  <div class="card-body">
      <h2 class="card-title h4">${i18nextInstance.t('text.feeds')}</h2>
  </div>
  <ul class="list-group border-0 rounded-0"></ul>`;
  elements.feeds.prepend(div);
  const ulFeeds = elements.feeds.querySelector('ul');
  state.data.feeds.forEach((item) => {
    const liFeeds = document.createElement('li');
    liFeeds.classList.add('list-group-item', 'border-0', 'border-end-0');
    liFeeds.innerHTML = `
    <h3 class="h6 m-0">${item.title}</h3>
      <p class="m-0 small text-black-50">${item.description}</p>
    </li>`;
    ulFeeds.prepend(liFeeds);
  });
}
