import elements from './elementsDom.js';

export default function renderPostAndFeeds(state, i18nextInstance) {
  elements.feeds.innerHTML = '';
  elements.posts.innerHTML = '';
  const div = document.createElement('div');
  div.classList.add('card', 'border-0');
  div.innerHTML = `
  <div class="card-body">
      <h2 class="card-title h4">${i18nextInstance.t('text.feeds')}</h2>
  </div>
  <ul class="list-group border-0 rounded-0"></ul>`;
  elements.feeds.prepend(div);
  const ulFeeds = elements.feeds.querySelector('ul');

  const divPosts = document.createElement('div');
  divPosts.classList.add('card', 'border-0');
  divPosts.innerHTML = `
    <div class="card-body">
      <h2 class="card-title h4">${i18nextInstance.t('text.posts')}</h2>
    </div>
    <ul class="list-group border-0 rounded-0"></ul>`;
  elements.posts.prepend(divPosts);

  const ulPosts = elements.posts.querySelector('ul');

  state.rssFiles.forEach((item) => {
    const liFeeds = document.createElement('li');
    liFeeds.classList.add('list-group-item', 'border-0', 'border-end-0');
    liFeeds.innerHTML = `
    <h3 class="h6 m-0">${item.fidsTitle}</h3>
      <p class="m-0 small text-black-50">${item.fidsDescription}</p>
    </li>`;
    ulFeeds.prepend(liFeeds);

    item.post.forEach((it) => {
      const liPosts = document.createElement('li');
      liPosts.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      liPosts.innerHTML = `
      <a href="${it.link}" class="fw-bold" data-id="${it.id}" target="_blank" rel="noopener noreferrer">${it.text}</a>
      <button type="button" class="btn btn-outline-primary btn-sm" data-id="${it.id}" data-bs-toggle="modal" data-bs-target="#modal">Просмотр</button>`;
      ulPosts.prepend(liPosts);
    });
  });
}
